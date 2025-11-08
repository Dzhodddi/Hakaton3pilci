package trypilci.back.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trypilci.back.entities.UserEntity;
import trypilci.back.entities.UserView;
import trypilci.back.services.UserService;

import java.net.URI;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;


    @PreAuthorize("#email == authentication.name")
    @GetMapping("/{email}")
    public ResponseEntity<UserEntity> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PreAuthorize("#user.email == authentication.name")
    @PostMapping
    public ResponseEntity<UserEntity> createUser(@RequestBody UserView user) {
        UserEntity created = userService.saveUser(user);
        return ResponseEntity.created(URI.create("/api/users/"+created.getEmail())).body(created);
    }

    @PreAuthorize("#email == authentication.name")
    @PutMapping("/{email}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable String email, @RequestBody UserView user) {
        return ResponseEntity.ok(userService.updateUser(email, user));
    }

    @PreAuthorize("#email == authentication.name")
    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
            userService.delete(email);
            return ResponseEntity.noContent().build();
    }
}

