package trypilci.back.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trypilci.back.entities.User;
import trypilci.back.services.UserService;

import java.net.URI;
import java.util.List;

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

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.saveUser(user);
        return ResponseEntity.created(URI.create("/api/users/"+created.getEmail())).body(created);
    }

    @PutMapping("/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(email, user));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
            userService.delete(email);
            return ResponseEntity.noContent().build();
    }
}

