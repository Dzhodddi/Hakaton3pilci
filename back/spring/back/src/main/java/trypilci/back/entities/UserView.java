package trypilci.back.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserView {
    private String email;
    private String firstName;
    private String lastName;
    private String occupation;
    private String education;
    private String experience;
    private String skills;
}
