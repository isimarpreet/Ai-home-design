import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./First.css";
import logo from "./renovaite.png";

function About() {
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

      <div className="about-section">
        <h1 className="about-title">About Renovaite</h1>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              At Renovaite, we're revolutionizing the way people approach interior design. 
              Our AI-powered platform combines cutting-edge technology with expert design principles 
              to create personalized, stunning spaces that reflect your unique style and vision.
            </p>
            <p className="about-description">
              Founded with a passion for making interior design accessible to everyone, 
              we've developed an innovative solution that eliminates the traditional barriers 
              of time, cost, and complexity. Our advanced AI algorithms analyze your space, 
              understand your preferences, and generate tailored design recommendations that 
              transform your living environment into something extraordinary.
            </p>
            <p className="about-description">
              What sets us apart is our commitment to combining artificial intelligence with 
              human-centered design principles. We believe that technology should enhance, 
              not replace, the creative process, ensuring that every design recommendation 
              is both technically sound and emotionally resonant.
            </p>
          </div>
        </div>
      </div>

      <footer className="first-footer">© 2025 renovaite. All rights reserved.</footer>
    </div>
  );
}

export default About; 