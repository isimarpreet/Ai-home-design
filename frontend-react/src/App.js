import React, { useState } from "react";
import "./App.css";
import logo from "./renovaite.png"; 
import uploadlogo from './uploadlogo.png';


function App() {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [roomDescription, setRoomDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [checkedSuggestions, setCheckedSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingModify, setLoadingModify] = useState(false);
  const [imageName, setImageName] = useState("ravinder room.jpg"); // Set appropriately
  const [selectedIdeas, setSelectedIdeas] = useState([]);   // List of strings
  const [modifiedImageUrl, setModifiedImageUrl] = useState(null);

  
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      if (response.ok) {
        alert("Image uploaded successfully!");
        fetchSuggestions(selectedFile.name);
      } else {
        setError("Error uploading image: " + data);
      }
    } catch (error) {
      setError("Failed to upload image: " + error.message);
    }
  };

  const fetchSuggestions = async (imageName) => {
    setLoadingSuggestions(true);
    try {
      const response = await fetch(`http://localhost:8080/api/gemini/analyze?imageName=${imageName}`);
      const data = await response.json();
      if (response.ok) {
        processSuggestions(data.ai_response);
      } else {
        setError("Error fetching AI suggestions.");
      }
    } catch (error) {
      setError("Failed to fetch AI suggestions: " + error.message);
    }
    setLoadingSuggestions(false);
  };

  const processSuggestions = (aiResponse) => {
    try {
      const jsonString = aiResponse.replace(/\n/g, " ");
      const parsedData = JSON.parse(jsonString);
      const aiText = parsedData.candidates[0].content.parts[0].text;

      const roomDescMatch = aiText.match(/ROOM DESCRIPTION:(.*?)RENOVATION IDEAS:/s);
      const roomDesc = roomDescMatch ? roomDescMatch[1].trim() : "No description found.";
      setRoomDescription(roomDesc);

      const suggestionsList = aiText
        .split("\n")
        .filter((line) => line.includes("**"))
        .map((line) => line.replace(/\*\*/g, "").trim());

      setSuggestions(suggestionsList);
    } catch (error) {
      setError("Error processing AI response");
    }
  };

  const handleCheckboxChange = (index) => {
    if (checkedSuggestions.includes(index)) {
      setCheckedSuggestions(checkedSuggestions.filter((i) => i !== index));
    } else {
      setCheckedSuggestions([...checkedSuggestions, index]);
    }
  };

  const handleModifyImage = async () => {
    setLoadingModify(true);
  
    try {
      const response = await fetch(`http://localhost:8080/api/modify?imageName=${encodeURIComponent(imageName)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedIdeas),
      });
  
      if (!response.ok) {
        throw new Error('Failed to modify image');
      }
  
      const blob = await response.blob();
      const imageURL = URL.createObjectURL(blob);
  
      // Optional: display or use imageURL in your app
      setModifiedImageUrl(imageURL);
    } catch (error) {
      console.error('Error modifying image:', error);
    } finally {
      setLoadingModify(false);
    }
  };
  

  return (
    <div className="App">
      {/* Your header and navbar code */}

      <div className="upload-container" style={{ width: "60%" }}>
        <h2>Upload a Picture of Your Room</h2>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label htmlFor="file-upload" className="upload-label">
          <img src={uploadlogo} alt="Upload" className="upload-logo" />
          <p className="upload-instruction">(Upload JPG, PNG, JPEG files.)</p>
        </label>

        <button onClick={handleUpload}>Upload Image</button>

        {previewUrl && (
          <div className="imagepreview-container" style={{ width: "60%" }}>
            <h3>Image Preview:</h3>
            <img src={previewUrl} alt="Preview" width="400px" />
          </div>
        )}
      </div>

      {roomDescription && (
        <div className="room-description">
          <h2 className="boldText">Room Description:</h2>
          <p>{roomDescription}</p>
        </div>
      )}

      {loadingSuggestions ? (
        <div className="loading-spinner">
          <p>Analyzing your room... Please wait!</p>
          <div className="spinner"></div>
        </div>
      ) : (
        suggestions.length > 0 && (
          <div className="suggestions-container">
            <h2 className="boldText">Renovation Suggestions:</h2>
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-box ${checkedSuggestions.includes(index) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    id={`suggestion-${index}`}
                    onChange={() => handleCheckboxChange(index)}
                    checked={checkedSuggestions.includes(index)}
                  />
                  <label htmlFor={`suggestion-${index}`}>{suggestion}</label>
                </div>
              ))}
            </div>
            <button onClick={handleModifyImage} disabled={loadingModify}>
              {loadingModify ? "Modifying..." : "Generate Modified Image"}
            </button>
          </div>
        )
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
