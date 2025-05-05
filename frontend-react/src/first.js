import React from 'react';
import "./first.css"; // Import CSS file for styling
import logo from "./renovaite.png"; // Ensure the logo file exists
import logobutton from "./logobutton cropped.png";
import firstimage from "./room1.png";


function FirstPage() {
  return (
    
    <div className="c">
      {/* Header Section */}`
      <div className="c">
  {/* Header Section */}
  <header className="first-header">
    
    <img src={logo} alt="Logo" className="first-logo" style={{ width: '250px', height: 'auto', marginLeft: '10px' }} />
    <nav className="first-nav">
      <button className="nav-btn-styled-btn" >Home</button>
      <button className="nav-btn-styled-btn" >About</button>
      <button className="nav-btn-styled-btn" >Services</button>
      <button className="nav-btn-styled-btn" >Contact</button>
    </nav>
    <button className="get-started-btn styled-btn">Get Started</button>
  </header>
</div>

      
      
      {/* Main Content */}
    
   <div className="design-section">
      {/* Left Side - Text */}
      <div className="text-content"><br></br>
        <p class="slogan"> Transform Your Space with AI-powered design <span style={{ color: '#2a6782' }}>Effortlessly.</span></p> 
        <p className="spaced-text"  >Revolutionize your home redesign experience.<br /> Upload a photo and watch as AI crafts personalized makeover suggestions. Tailor every detail to your style, receive instant cost estimates, and plan your renovation effortlessly. Your dream home is just a click away.
        </p>
      </div>
      
      {/* Right Side - Image */}
      <div className="image-content">
        <img src={firstimage} alt="Design Preview" />
      </div>
    </div>    
 




 {/* Decorative Background Layer */}
<div className="background-overlay"></div>

{/* Highlight Section - Bold Feature */}
<div className="highlight-box">
  <h2 className="highlight-title">✨ Instant AI Makeovers</h2>
  <p className="highlight-description">
    See your space transformed in seconds with our intelligent visualization tool.
  </p>
</div>

{/* Icon Features Section */}
<div className="features-row">
  <div className="feature-card">
    <img src="/icons/upload.svg" alt="Upload" />
    <h4>1. Upload a Photo</h4>
    <p>Start with a snapshot of your space.</p>
  </div>
  <div className="feature-card">
    <img src="/icons/style.svg" alt="Style" />
    <h4>2. Choose Your Style</h4>
    <p>Pick from modern, classic, minimal & more.</p>
  </div>
  <div className="feature-card">
    <img src="/icons/estimate.svg" alt="Estimate" />
    <h4>3. Get Instant Estimates</h4>
    <p>Know your cost before you begin.</p>
  </div>
</div>

{/* Call to Action */}
<div className="cta-section">
  <h3>Ready to design your dream space?</h3>
  <button className="cta-button">Start Designing</button>
</div>





 {/* logobutton */}
 <button className="floating-btn">
        <img src={logobutton} alt="Button Icon" />
      </button>
      

      {/* Footer Section */}
      <footer className="first-footer">© 2025 renovaite. All rights reserved.</footer>
    </div>
  );
}

export default FirstPage;