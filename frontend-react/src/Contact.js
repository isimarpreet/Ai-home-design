import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./First.css";
import logo from "./renovaite.png";

function Contact() {
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

      <div className="contact-section">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p className="contact-description">
              Have questions about our AI-powered interior design services? 
              We're here to help you transform your space into something extraordinary.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <h3>Email</h3>
                <p>navtejss12345@gmail.com</p>
              </div>
              <div className="contact-item">
                <h3>Response Time</h3>
                <p>We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="first-footer">© 2025 renovaite. All rights reserved.</footer>
    </div>
  );
}

export default Contact; 