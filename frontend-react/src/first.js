import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./First.css";
import logo from "./renovaite.png";
import logobutton from "./logobutton cropped.png";
import firstimage from "./room1.png";

function First() {
  const navigate = useNavigate();

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

  return (
    <div className="first-page">
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

      <div className="design-section">
        <div className="text-content">
          <p className="slogan">Transform Your Space with AI-powered design <span style={{ color: '#2a6782' }}>Effortlessly.</span></p>
          <p className="spaced-text">
            Revolutionize your home redesign experience.
            Upload a photo and watch as AI crafts personalized makeover suggestions.
            Tailor every detail to your style, receive instant cost estimates,
            and plan your renovation effortlessly. Your dream home is just a click away.
          </p>
        </div>
        
        <div className="image-content">
          <img src={firstimage} alt="Design Preview" />
        </div>
      </div>

      <div className="workflow-section">
        <h2 className="workflow-title">How It Works</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h3>Upload Your Space</h3>
            <p>Simply upload a photo of your room. Our AI will analyze your space and understand its current layout.</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            <h3>Choose Your Style</h3>
            <p>Select your preferred design style from our curated options - Modern, Minimalist, Boho, Traditional, or Industrial.</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <h3>Get AI Suggestions</h3>
            <p>Receive personalized design recommendations tailored to your space and style preferences.</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">4</div>
            <h3>Visualize Changes</h3>
            <p>See your space transformed with our AI-powered visualization tool before making any changes.</p>
          </div>
        </div>
      </div>

      <button className="floating-btn" onClick={handleGetStarted}>
        <img src={logobutton} alt="Button Icon" />
      </button>

      <footer className="first-footer">© 2025 renovaite. All rights reserved.</footer>
    </div>
  );
}

export default First; 