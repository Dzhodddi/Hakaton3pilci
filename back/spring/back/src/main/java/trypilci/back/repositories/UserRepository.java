package trypilci.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trypilci.back.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

}
