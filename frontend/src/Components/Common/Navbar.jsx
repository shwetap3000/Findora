import React, { useState } from "react";
import { Link } from "react-router-dom";
import navlogo from "../../assets/navLogo.png";
import "../../Styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


// functional component to handle private links view on the menu bar
// both of these links will only get visible when user is logged-in
const PrivateLinks = () => {
  return (
    <>
      <Link to="/report" className="link">
        Report Item
      </Link>
      <Link to="/profile" className="link">
        Profile
      </Link>
    </>
  );
};


// functional component to handle the public ui view on the menu bar
// for the public ui view or when the user is not logged-in, these links will be shown up
const AuthLinks = () => {
  return (
    <>
    <Link to="/signup" className="link">
        SignUp
      </Link>
      <Link to="/login" className="link">
        Login
      </Link>
      
    </>
  );
};


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen)

  const handleMeuChange = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  // getting access token from the storage to keep track of which links to show (public or private)
  const accessToken = localStorage.getItem("accessToken");

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
            <div className="nav-links" onClick={() => setIsOpen(false)}>
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>

              {/* condition that decides which links to be shown (public or private) */}
              {accessToken ? <PrivateLinks /> : <AuthLinks />}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
