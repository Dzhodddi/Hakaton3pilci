package trypilci.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import trypilci.back.entities.QuestionEntity;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    List<QuestionEntity> findAllById(Long id);
    @Query(value = "SELECT * FROM questions ORDER BY RANDOM() LIMIT 5", nativeQuery = true)
    List<QuestionEntity> findRandom5Questions();
}
