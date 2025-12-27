import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/EndSection.css';

function EndSection() {
  // useNavigation hook to handle the page navigation
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/report-item");
    // console.log("Clicked Get Started");
  };

  return (
    <div className="cta-section">
      <h3 className="cta-header">Start reporting lost items today</h3>
      <button className="cta-btn" onClick={handleStart}>
        Get Started
      </button>
    </div>
  );
}

export default EndSection;

// for using useNavigation hook react-router-dom must be installed and configured with <BrowserRouter> and <Routes>

// (this can also be done by directly wrapping the button inside the Link component of react router dom)
