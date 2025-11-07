package trypilci.back.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import trypilci.back.entities.User;
import trypilci.back.entities.UserView;
import trypilci.back.services.UserService;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;


//    @GetMapping
//    public List<User> getAllUsers() {
//        return userService.findAll();
//    }

//    @GetMapping("/user")
//    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
//        return principal.getAttributes();
//    }
//
//    @GetMapping("/auth/google/callback")
//    public String googleCallback() {
//        return "callback"; // renders callback.html
//    }

//    @GetMapping("/auth/google/callback")
//    public String callback(@RequestParam(required = false) String code,
//                           @RequestParam(required = false) String error) {
//        if (error != null) {
//            return "Error: " + error;
//        }
//        if (code != null) {
//            return "Received auth code: " + code;
//        }
//        return "No code or error received.";
//    }
//
//    @GetMapping("/me")
//    public Map<String, Object> userInfo(@AuthenticationPrincipal Jwt jwt) {
//        return Map.of(
//                "email", jwt.getClaim("email"),
//                "name", jwt.getClaim("name"),
//                "picture", jwt.getClaim("picture")
//        );
//    }
//
    @PreAuthorize("#email == authentication.name")
    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PreAuthorize("#user.email == authentication.name")
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserView user) {
        User created = userService.saveUser(user);
        return ResponseEntity.created(URI.create("/api/users/"+created.getEmail())).body(created);
    }

    @PreAuthorize("#email == authentication.name")
    @PutMapping("/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody UserView user) {
        return ResponseEntity.ok(userService.updateUser(email, user));
    }

    @PreAuthorize("#email == authentication.name")
    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
            userService.delete(email);
            return ResponseEntity.noContent().build();
    }
}

