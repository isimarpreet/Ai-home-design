package net.aihomedesign.backend.controller;

import net.aihomedesign.backend.service.ImageModificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageModificationController {

    @Autowired
    private ImageModificationService imageModificationService;

    @PostMapping("/modify-image")
    public ResponseEntity<byte[]> modifyImage(@RequestBody Map<String, Object> request) {
        try {
            String imageName = (String) request.get("imageName");
            @SuppressWarnings("unchecked")
            List<String> modifications = (List<String>) request.get("modifications");

            byte[] modifiedImage = imageModificationService.modifyImage(imageName, modifications);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(modifiedImage);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 