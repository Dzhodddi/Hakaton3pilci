package trypilci.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trypilci.back.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {

}
