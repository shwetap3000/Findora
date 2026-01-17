import React from "react";
import aboutLogo from "../../assets/aboutPage.png"
import "../../Styles/WelcomeCard.css";
import "../../Styles/About.css";

function WelcomeCard() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="about-card-heading">About Findora</h2>
        <div className="about-sub-wrapper">
          <div className="about-img">
            <img src={aboutLogo} alt="about-img" className="about-card-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
