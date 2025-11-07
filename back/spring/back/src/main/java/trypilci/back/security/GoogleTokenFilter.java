package trypilci.back.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Component
public class GoogleTokenFilter extends OncePerRequestFilter {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                HttpRequest googleRequest = HttpRequest.newBuilder()
                        .uri(URI.create("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token))
                        .GET()
                        .build();

                HttpResponse<String> googleResponse =
                        httpClient.send(googleRequest, HttpResponse.BodyHandlers.ofString());

                if (googleResponse.statusCode() == 200) {
                    JsonNode json = mapper.readTree(googleResponse.body());

                    String email = json.path("email").asText(null);
                    if (email != null) {
                        var auth = new UsernamePasswordAuthenticationToken(
                                email, // principal (user identity)
                                null,  // credentials
                                List.of(new SimpleGrantedAuthority("ROLE_USER")) // roles
                        );
                        SecurityContextHolder.getContext().setAuthentication(auth);

                        request.setAttribute("userEmail", email);
                        filterChain.doFilter(request, response);
                        return;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // If token missing or invalid
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Invalid or missing Google OAuth2 token");
    }
}
