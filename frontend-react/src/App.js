import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import logo from "./renovaite.png"; 
import uploadlogo from './uploadlogo.png';

function App() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [roomDescription, setRoomDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [checkedSuggestions, setCheckedSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingModify, setLoadingModify] = useState(false);
  const [imageName, setImageName] = useState("ravinder room.jpg");
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [modifiedImageUrl, setModifiedImageUrl] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [userStyle, setUserStyle] = useState('');

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleServicesClick = () => {
    navigate('/services');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleGetStarted = () => {
    navigate('/app');
  };

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
      setSelectedIdeas(selectedIdeas.filter((_, i) => i !== index));
    } else {
      setCheckedSuggestions([...checkedSuggestions, index]);
      setSelectedIdeas([...selectedIdeas, suggestions[index]]);
    }
  };

  // Cost estimation function
  const calculateEstimatedCost = (suggestions) => {
    const baseCosts = {
      'paint': 5000,
      'furniture': 15000,
      'lighting': 3000,
      'flooring': 10000,
      'decor': 5000,
      'renovation': 20000
    };

    let totalCost = 0;
    suggestions.forEach(suggestion => {
      // Check which category the suggestion falls into
      if (suggestion.toLowerCase().includes('paint')) totalCost += baseCosts.paint;
      if (suggestion.toLowerCase().includes('furniture')) totalCost += baseCosts.furniture;
      if (suggestion.toLowerCase().includes('light')) totalCost += baseCosts.lighting;
      if (suggestion.toLowerCase().includes('floor')) totalCost += baseCosts.flooring;
      if (suggestion.toLowerCase().includes('decor')) totalCost += baseCosts.decor;
      if (suggestion.toLowerCase().includes('renovate')) totalCost += baseCosts.renovation;
    });

    return totalCost;
  };

  const handleModifyImage = async () => {
    if (selectedIdeas.length === 0) {
      alert("Please select at least one suggestion to modify the image");
      return;
    }

    setLoadingModify(true);
    try {
      const response = await fetch('http://localhost:8080/api/modify-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageName: selectedFile.name,
          modifications: selectedIdeas
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to modify image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setModifiedImageUrl(imageUrl);
      
      // Calculate and set estimated cost
      const cost = calculateEstimatedCost(selectedIdeas);
      setEstimatedCost(cost);
    } catch (error) {
      setError("Failed to modify image: " + error.message);
    } finally {
      setLoadingModify(false);
    }
  };

  return (
    <div className="App">
      <header className="first-header">
        <img src={logo} alt="Logo" className="first-logo" style={{ width: '250px', height: 'auto', marginLeft: '10px' }} />
        <nav className="first-nav">
          <button className="nav-btn-styled-btn" onClick={handleHomeClick}>Home</button>
          <button className="nav-btn-styled-btn" onClick={handleAboutClick}>About</button>
          <button className="nav-btn-styled-btn" onClick={handleServicesClick}>Services</button>
          <button className="nav-btn-styled-btn" onClick={handleContactClick}>Contact</button>
        </nav>
        <button className="get-started-btn styled-btn" onClick={handleGetStarted}>Get Started</button>
      </header>

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
            
            <div className="style-preference">
              <h3>Select Your Style Preference:</h3>
              <select 
                value={userStyle} 
                onChange={(e) => setUserStyle(e.target.value)}
                className="style-select"
              >
                <option value="">Select a style</option>
                <option value="modern">Modern</option>
                <option value="minimalist">Minimalist</option>
                <option value="boho">Boho</option>
                <option value="traditional">Traditional</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
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
            {checkedSuggestions.length > 0 && (
              <button 
                className="modify-btn styled-btn"
                onClick={handleModifyImage}
                disabled={loadingModify}
              >
                {loadingModify ? "Modifying..." : "Modify Image"}
              </button>
            )}
          </div>
        )
      )}

      {modifiedImageUrl && (
        <div className="modified-image-container">
          <h2 className="boldText">Modified Image:</h2>
          <img 
            src={modifiedImageUrl} 
            alt="Modified" 
            style={{ 
              maxWidth: "60%", 
              height: "auto",
              margin: "20px auto",
              display: "block",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }} 
          />
          {estimatedCost && (
            <div className="cost-estimation">
              <h3>Estimated Cost:</h3>
              <p className="cost-amount">₹{estimatedCost.toLocaleString()}</p>
              <p className="cost-note">*This is an approximate cost based on selected modifications</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
