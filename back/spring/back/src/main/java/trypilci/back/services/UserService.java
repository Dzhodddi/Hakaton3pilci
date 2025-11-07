package trypilci.back.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import trypilci.back.entities.User;
import trypilci.back.entities.UserView;
import trypilci.back.misc.ResourceNotFoundException;
import trypilci.back.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

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

    public User saveUser(UserView user) {
//        if (userRepository.existsById(user.getEmail())) {
//            return userRepository.findById(user.getEmail()).get();
//        }
        return userRepository.save(parseView(new User(), user.getEmail(), user));
    }

    public User updateUser(String email, UserView view) {
//        return userRepository.findById(email)
//                .map(existing -> {
//                    existing.setEmail(user.getEmail());
//                    return userRepository.save(existing);
//                })
//                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        Optional<User> user = userRepository.findById(email);
//        if (!userRepository.existsById(email)) {
        if(user.isEmpty()) {
            throw new RuntimeException("User not found: " + email);
        }
        return userRepository.save(parseView(user.get(), user.get().getEmail(), view));
    }

    public void delete(String email) {
        if (!userRepository.existsById(email)) {
            throw new RuntimeException("User not found: " + email);
        }
        userRepository.deleteById(email);
    }

    private User parseView(User user, String email, UserView userView) {
        if (userView == null) return null;
        user.setEmail(email);
        if(userView.getFirstName()!=null)user.setFirstName(userView.getFirstName());
        if(userView.getLastName()!=null)user.setLastName(userView.getLastName());
        if(userView.getOccupation()!=null)user.setOccupation(userView.getOccupation());
        if(userView.getEducation()!=null)user.setEducation(userView.getEducation());
        if(userView.getExperience()!=null)user.setExperience(userView.getExperience());
        if(userView.getSkills()!=null)user.setSkills(userView.getSkills());

        return user;
    }
}
