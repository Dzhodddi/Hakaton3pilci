package trypilci.back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import trypilci.back.entities.User;
import trypilci.back.repositories.UserRepository;

@Configuration
public class Config {

    @Bean
    CommandLineRunner dbPopulator(UserRepository userRepository) {
        return args -> {
          User user = new User();
          user.setEmail("user1@domain");
          user.setFirstName("John");
          user.setLastName("Doe");
          userRepository.save(user);
        };
    }
}
