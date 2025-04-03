import React from "react";
import "./first.css"; // Import CSS file for styling
import logo from "./renovaite.png"; // Ensure the logo file exists
import logobutton from "./logobutton cropped.png";
import firstimage from "./room1.png";


function FirstPage() {
  return (
    
    <div className="c">
      {/* Header Section */}
      <header className="first-header">
        <img src={logo} alt="Logo" className="first-logo"  style={{ width: '250px', height: 'auto ',marginLeft: '10px'}}/>
        <nav className="first-nav">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">About</button>
          <button className="nav-btn">Services</button>
          <button className="nav-btn">Contact</button>
        </nav>
        <button className="get-started-btn" style={{ marginRight: '50px' ,width: '120px', height: '50px',justifyContent: 'center',fontSize: '15px'}}>Get Started</button>
      </header>

      
      
      {/* Main Content */}
    
    
    <div className="design-section">
      {/* Left Side - Text */}
      <div className="text-content"><br></br>
        <p class="slogan"> <strong><b>Transform Your Space with AI-powered design <span style={{ color: '#582c69' }}>Effortlessly.</span></b></strong></p> 
        <p className="spaced-text" >Revolutionize your home redesign experience. Upload a photo and watch as AI crafts personalized makeover suggestions. Tailor every detail to your style, receive instant cost estimates, and plan your renovation effortlessly. Your dream home is just a click away.
        </p>
      </div>
      
      {/* Right Side - Image */}
      <div className="image-content">
        <img src={firstimage} alt="Design Preview" />
      </div>
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
