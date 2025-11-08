package trypilci.back.controllers;

import com.opencsv.CSVReader;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import trypilci.back.entities.QuestionEntity;
import trypilci.back.repositories.QuestionRepository;

import java.io.InputStreamReader;
import java.util.List;

@Controller
@RequestMapping("/api/questions")
@AllArgsConstructor
public class QuestionController {

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping()
    public ResponseEntity<List<QuestionEntity>> find5Random() {
        return ResponseEntity.ok(questionRepository.findRandom5Questions());
    }

    @PostMapping
    public ResponseEntity<QuestionEntity> reloadQuestions() {
        questionRepository.deleteAll();
        try (CSVReader reader = new CSVReader(new InputStreamReader(
                getClass().getResourceAsStream("/questions.csv")))) {

            List<String[]> rows = reader.readAll();
            for (String[] row : rows) {
                QuestionEntity questionEntity = new QuestionEntity();
                questionEntity.setQuestion(row[0]);
                questionEntity.setAnswer(row[1]);
                questionEntity.setWrong1(row[2]);
                questionEntity.setWrong2(row[3]);
                questionEntity.setWrong3(row[4]);
                questionRepository.save(questionEntity);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }
}
