package trypilci.back.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trypilci.back.entities.CvEntity;
import trypilci.back.entities.CvView;
import trypilci.back.entities.UserEntity;
import trypilci.back.entities.UserView;
import trypilci.back.misc.ResourceNotFoundException;
import trypilci.back.repositories.CvRepository;
import trypilci.back.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CvService {
    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private UserService userService;

    public List<CvEntity> findAllByUser_Email(String email) {
        UserEntity user = userService.findByEmail(email);
        return cvRepository.findAllByUser_Email(user.getEmail());
    }

    public CvEntity findById(Long id) {
        return cvRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cv not found with id: " + id));
    }

    public CvEntity saveCv(CvView cvView) {
        return cvRepository.save(parseView(new CvEntity(), cvView));
    }

    public CvEntity updateCv(Long id, CvView cvView) {
        Optional<CvEntity> cv = cvRepository.findById(id);
        if(cv.isEmpty()) {
            throw new ResourceNotFoundException("Cv not found with id: " + id);
        }
        return cvRepository.save(parseView(cv.get(), cvView));
    }

    public void delete(Long id) {
        if (!cvRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cv not found with id: " + id);
        }
        cvRepository.deleteById(id);
    }

    private CvEntity parseView(CvEntity cv, CvView cvView) {
        if (cv.getUser()==null) {cv.setUser(userService.findByEmail(cvView.getUserEmail()));}
        if (cvView.getContent()!=null)cv.setContent(cvView.getContent());
        if (cv.getContent()==null)throw new ValidationException("Field cannot be empty");

        return cv;
    }

}
