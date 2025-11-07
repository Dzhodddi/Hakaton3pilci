package trypilci.back.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import trypilci.back.entities.User;
import trypilci.back.misc.ResourceNotFoundException;
import trypilci.back.repositories.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

//    public List<User> getAll() {
//        return userRepository.findAll();
//    }

    public User findByEmail(String email) {
        return userRepository.findById(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String email, User user) {
        return userRepository.findById(email)
                .map(existing -> {
                    existing.setEmail(user.getEmail());
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    public void delete(String email) {
        if (!userRepository.existsById(email)) {
            throw new RuntimeException("User not found: " + email);
        }
        userRepository.deleteById(email);
    }
}
