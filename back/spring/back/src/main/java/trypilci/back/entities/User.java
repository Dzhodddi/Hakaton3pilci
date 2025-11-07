package trypilci.back.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private Long id;

    @Id
    private String email;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;


}
