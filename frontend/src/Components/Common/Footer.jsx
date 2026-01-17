import React from "react";
import '../../Styles/footer.css'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <h3>Findora</h3>
      <p className="footer-wrapper-para">Helping you recover what matters!</p>

      <div className="quick-links">
        <p>Quick Links:</p>
        <Link to="/">Home |</Link>
        <Link to="/dashboard">Dashboard |</Link>
        <Link to="/about">About</Link>
        
      </div>

      <div className="contact-links">
        <p className="contact-para">Contact:</p>
        <a href="mailto:findora.campus@gmail.com" className="official-mail">findora.campus@gmail.com</a>
      </div>

      <div className="footer-bottom">
        © 2025 Findora. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
