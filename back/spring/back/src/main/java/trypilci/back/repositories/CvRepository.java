package trypilci.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trypilci.back.entities.CvEntity;

import java.util.List;

@Repository
public interface CvRepository extends JpaRepository<CvEntity, Long> {
    List<CvEntity> findAllByUser_Email(String id);
}
