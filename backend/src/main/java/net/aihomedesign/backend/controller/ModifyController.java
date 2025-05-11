package net.aihomedesign.backend.controller;

import net.aihomedesign.backend.service.HuggingFaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/modify")
public class ModifyController {

    @Autowired
    private HuggingFaceService huggingFaceService;

    @PostMapping
    public ResponseEntity<byte[]> modifyImage(
            @RequestParam("imageName") String imageName,
            @RequestBody List<String> selectedIdeas) {

        try {
            byte[] modifiedImage = huggingFaceService.modifyImage(imageName, selectedIdeas);
            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(modifiedImage);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
