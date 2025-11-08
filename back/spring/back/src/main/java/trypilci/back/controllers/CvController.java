package trypilci.back.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import trypilci.back.entities.CvEntity;
import trypilci.back.entities.CvView;
import trypilci.back.services.CvService;
import trypilci.back.services.UserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cvs")
public class CvController {

    @Autowired
    private CvService cvService;


    @PreAuthorize("#email == authentication.name")
    @GetMapping("/of/{email}")
    public ResponseEntity<List<CvEntity>> getCvs(@PathVariable String email){
        return ResponseEntity.ok(cvService.findAllByUser_Email(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CvEntity> getCvById(@PathVariable long id, Authentication auth) {
        CvEntity cv = cvService.findById(id);
        if (!cv.getUserEmail().equals(auth.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(cvService.findById(id));
    }


    @PostMapping
    public ResponseEntity<CvEntity> createCv(@RequestBody CvView cv, Authentication auth) {
        if (!cv.getUserEmail().equals(auth.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(cvService.saveCv(cv));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CvEntity> updateCv(@PathVariable long id, @RequestBody CvView cv, Authentication auth) {
        CvEntity cvEntity = cvService.findById(id);
        if (!cvEntity.getUserEmail().equals(auth.getName())||!cv.getUserEmail().equals(auth.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(cvService.updateCv(id, cv));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CvEntity> deleteCv(@PathVariable long id, Authentication auth) {
        CvEntity cv = cvService.findById(id);
        if (!cv.getUserEmail().equals(auth.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        cvService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
