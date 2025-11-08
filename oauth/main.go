package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/pat"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/rs/cors"
	"html/template"
	"log"
	"net/http"
	"os"
	"sort"
)

func init() {
	_ = godotenv.Load()
}

type UserProfile struct {
	Email string `json:"email"`
}

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("URL")},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	log.Println("Starting server...")
	const sessionName = "auth-session"
	store := sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))
	store.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400 * 7,
	}
	gothic.Store = store
	goth.UseProviders(
		google.New(os.Getenv("GOOGLE_KEY"), os.Getenv("GOOGLE_SECRET"), "http://localhost:3000/auth/google/callback"),
	)

	m := map[string]string{
		"google": "Google",
	}
	var keys []string
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	providerIndex := &ProviderIndex{Providers: keys, ProvidersMap: m}

	p := pat.New()

	p.Get("/api/me", func(res http.ResponseWriter, req *http.Request) {
		session, err := store.Get(req, sessionName)
		if err != nil {
			http.Error(res, "Failed to get session", http.StatusInternalServerError)
			return
		}

		email, ok := session.Values["email"].(string)
		if !ok || email == "" {
			http.Error(res, "Unauthorized", http.StatusUnauthorized)
			return
		}

		user := UserProfile{
			Email: email,
		}

		res.Header().Set("Content-Type", "application/json")
		json.NewEncoder(res).Encode(user)
	})

	p.Post("/api/logout", func(res http.ResponseWriter, req *http.Request) {
		session, err := store.Get(req, sessionName)
		if err != nil {
			log.Printf("Error getting session on logout: %v", err)
		}

		session.Values["email"] = ""
		session.Options.MaxAge = -1

		err = session.Save(req, res)
		if err != nil {
			log.Printf("Error saving session on logout: %v", err)
			http.Error(res, "Failed to logout", http.StatusInternalServerError)
			return
		}
		res.Header().Set("Content-Type", "application/json")
		json.NewEncoder(res).Encode(map[string]bool{"success": true})
	})

	p.Get("/auth/{provider}/callback", func(res http.ResponseWriter, req *http.Request) {
		user, err := gothic.CompleteUserAuth(res, req)
		if err != nil {
			fmt.Fprintln(res, err)
			return
		}
		session, _ := store.Get(req, sessionName)
		session.Values["email"] = user.Email
		session.Save(req, res)

		http.Redirect(res, req, "http://localhost:5173/newprofile", http.StatusTemporaryRedirect)
	})

	p.Get("/auth/{provider}", func(res http.ResponseWriter, req *http.Request) {
		if gothUser, err := gothic.CompleteUserAuth(res, req); err == nil {
			t, _ := template.New("foo").Parse(userTemplate)
			t.Execute(res, gothUser)
		} else {
			gothic.BeginAuthHandler(res, req)
		}
	})

	p.Get("/", func(res http.ResponseWriter, req *http.Request) {
		t, _ := template.New("foo").Parse(indexTemplate)
		t.Execute(res, providerIndex)
	})

	handler := c.Handler(p)
	log.Println("listening on localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", handler))
}

type ProviderIndex struct {
	Providers    []string
	ProvidersMap map[string]string
}

var indexTemplate = `{{range $key,$value:=.Providers}}
    <p><a href="/auth/{{$value}}">Log in with {{index $.ProvidersMap $value}}</a></p>
{{end}}`

var userTemplate = `
<p>Name: {{.Name}} [{{.LastName}}, {{.FirstName}}]</p>
<p>Email: {{.Email}}</p>
<p>NickName: {{.NickName}}</p>
<p>Location: {{.Location}}</p>
<p>AvatarURL: {{.AvatarURL}} <img src="{{.AvatarURL}}"></p>
<p>Description: {{.Description}}</p>
<p>UserID: {{.UserID}}</p>
<p>AccessToken: {{.AccessToken}}</p>
<p>ExpiresAt: {{.ExpiresAt}}</p>
<p>RefreshToken: {{.RefreshToken}}</p>
`
