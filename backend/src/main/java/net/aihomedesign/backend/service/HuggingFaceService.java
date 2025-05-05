package net.aihomedesign.backend.service;

import org.springframework.stereotype.Service;
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

@Service
public class HuggingFaceService {

//    private static final String HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/digiplay/instruct-pix2pix";  ✅ using img2img instruct pix2pix
 //   private static final String HUGGINGFACE_API_TOKEN = "Bearer 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"; // your real Hugging Face token

    public byte[] modifyImage(String imageName, List<String> selectedIdeas) throws Exception {
        // Read the uploaded image file
        String imagePath = "uploads/" + imageName;
        File imageFile = new File(imagePath);

        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        // Combine the selected ideas into a single instruction
        String instruction = String.join(", ", selectedIdeas);

        // Build JSON payload
        String payload = "{\n" +
                "  \"inputs\": {\n" +
                "    \"image\": \"" + base64Image + "\",\n" +
                "    \"prompt\": \"" + instruction + "\"\n" +
                "  }\n" +
                "}";

        // Send HTTP request to Hugging Face
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(HUGGINGFACE_API_URL))
                .header("Authorization", HUGGINGFACE_API_TOKEN)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<byte[]> response = client.send(request, HttpResponse.BodyHandlers.ofByteArray());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Failed to modify image: " + new String(response.body()));
        }

        return response.body();
    }
}
