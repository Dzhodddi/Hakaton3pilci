package trypilci.back;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import trypilci.back.entities.CvEntity;
import trypilci.back.entities.UserEntity;
import trypilci.back.repositories.CvRepository;
import trypilci.back.repositories.UserRepository;

@Configuration
public class Config {

    @Bean
    @Profile("h2")
    CommandLineRunner dbPopulator(UserRepository userRepository, CvRepository cvRepository) {
        return args -> {
          UserEntity userEntity = new UserEntity();
          userEntity.setEmail("ivansosniuk@gmail.com");
          userEntity.setFirstName("John");
          userEntity.setLastName("Doe");
          userRepository.save(userEntity);

          CvEntity cvEntity = new CvEntity();
          cvEntity.setContent("Cv content");
          cvEntity.setUser(userEntity);
          cvRepository.save(cvEntity);
        };
    }
}
