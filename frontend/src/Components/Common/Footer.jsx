import React from "react";
import '../../Styles/footer.css'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-wrapper">
      <h3>Findora</h3>
      <p>Helping you recover what matters !</p>

      <div className="quick-links">
        <p>Quick Links:</p>
        <Link to="/">Home |</Link>
        <Link to="/dashboard"> Dashboard |</Link>
        <Link to="/report"> Report Item |</Link>
        <Link to="/profile"> Profile</Link>
      </div>

      <div className="contact-links">
        <p>Contact Us:</p>
        Ph: xxxxxxxxxx | email: abc@gmail.com
      </div>

      <div className="footer-bottom">
        © 2025 Findora. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
