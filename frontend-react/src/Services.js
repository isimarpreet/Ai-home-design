import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./First.css";
import logo from "./renovaite.png";

function Services() {
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

      <div className="services-section">
        <h1 className="services-title">Our Services</h1>
        <div className="services-grid">
          <div className="service-card">
            <h2>AI-Powered Design Analysis</h2>
            <p>Upload your space photos and receive instant AI-generated design recommendations tailored to your style preferences and space requirements.</p>
          </div>
          <div className="service-card">
            <h2>Virtual Room Transformation</h2>
            <p>Experience your space transformation in real-time with our advanced visualization technology, showing you exactly how your room will look.</p>
          </div>
          <div className="service-card">
            <h2>Cost Estimation</h2>
            <p>Get accurate cost estimates for your design implementation, helping you plan your budget effectively.</p>
          </div>
          <div className="service-card">
            <h2>Style Recommendations</h2>
            <p>Receive personalized style suggestions based on your preferences, current trends, and your space's unique characteristics.</p>
          </div>
        </div>
      </div>

      <footer className="first-footer">© 2025 renovaite. All rights reserved.</footer>
    </div>
  );
}

export default Services; 