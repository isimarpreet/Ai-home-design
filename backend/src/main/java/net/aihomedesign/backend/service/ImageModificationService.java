package net.aihomedesign.backend.service;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.binary.Base64;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Service
public class ImageModificationService {

    @Value("${huggingface.api.key}")
    private String huggingFaceApiKey;

    private static final String HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public byte[] modifyImage(String imageName, List<String> modifications) throws IOException {
        // Read the original image
        String uploadsDir = "uploads";
        Path imagePath = Paths.get(uploadsDir, imageName);
        byte[] imageBytes = Files.readAllBytes(imagePath);
        String base64Image = Base64.encodeBase64String(imageBytes);

        // Create the prompt from modifications
        String prompt = String.join(", ", modifications);
        
        // Prepare the request payload
        Map<String, Object> payload = Map.of(
            "inputs", Map.of(
                "image", base64Image,
                "prompt", prompt,
                "negative_prompt", "blurry, low quality, distorted",
                "num_inference_steps", 50,
                "guidance_scale", 7.5
            )
        );

        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(HUGGINGFACE_API_URL);
            request.setHeader("Authorization", "Bearer " + huggingFaceApiKey);
            request.setHeader("Content-Type", "application/json");
            request.setEntity(new StringEntity(objectMapper.writeValueAsString(payload), ContentType.APPLICATION_JSON));

            return client.execute(request, response -> {
                if (response.getCode() == 200) {
                    return response.getEntity().getContent().readAllBytes();
                } else {
                    throw new IOException("Failed to modify image: " + response.getCode());
                }
            });
        }
    }
} 