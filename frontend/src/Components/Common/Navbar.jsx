import React, { useState } from "react";
import { Link } from "react-router-dom";
import navlogo from "../../assets/navLogo.png";
import "../../Styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen)

  const handleMeuChange = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  return (
    <div>

      {/* always visible */}
      <nav className="nav-wrapper">
        <Link to="/" className="first-link">
          <img src={navlogo} alt="nav-logo" className="nav-logo" />
          <h2 className="heading1">Findora</h2>
        </Link>

        {/* true and false must be boolean value here (using string like 'false' or 'true' won't give the required output) */}
        {isOpen === false ? (
          <FontAwesomeIcon
            icon={faBars}
            className="nav-bars"
            onClick={handleMeuChange}
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            className="nav-bars"
            onClick={handleMeuChange}
          />
        )}

        {isOpen && (
          <div className="nav-links-wrapper">
            {/* onClick function to close the menu when any of the links clicked */}
            <div className="nav-links"  onClick={() => setIsOpen(false)}>
              <Link to="/" className="link" >
                Home
              </Link>
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
              <Link to="/report" className="link">
                Report Item
              </Link>
              <Link to="/profile" className="link">
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
