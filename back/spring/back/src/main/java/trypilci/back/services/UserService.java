package trypilci.back.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trypilci.back.entities.UserEntity;
import trypilci.back.entities.UserView;
import trypilci.back.misc.ResourceNotFoundException;
import trypilci.back.repositories.UserRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;


    public UserEntity findByEmail(String email) {
        return userRepository.findById(email).orElseThrow(()->new ResourceNotFoundException("User not found with email: " + email));
    }

    public UserEntity saveUser(UserView userView) {
        Optional<UserEntity> user = userRepository.findById(userView.getEmail());
        return userRepository.save(parseView(user.isPresent()?user.get():new UserEntity(), userView.getEmail(), userView));
    }

    public UserEntity updateUser(String email, UserView view) {
        Optional<UserEntity> user = userRepository.findById(email);
        if(user.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return userRepository.save(parseView(user.get(), user.get().getEmail(), view));
    }

    public void delete(String email) {
        if (!userRepository.existsById(email)) {
            throw new RuntimeException("User not found with email: " + email);
        }
        userRepository.deleteById(email);
    }

    private UserEntity parseView(UserEntity user, String email, UserView userView) {
        if (userView == null) return null;
        if (user.getEmail()==null)user.setEmail(email);
        if(userView.getFirstName()!=null)user.setFirstName(userView.getFirstName());
        if(userView.getLastName()!=null)user.setLastName(userView.getLastName());
        if(userView.getOccupation()!=null)user.setOccupation(userView.getOccupation());
        if(userView.getEducation()!=null)user.setEducation(userView.getEducation());
        if(userView.getExperience()!=null)user.setExperience(userView.getExperience());
        if(userView.getSkills()!=null)user.setSkills(userView.getSkills());

        return user;
    }
}
