import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/WelcomeCard.css";
import bag from "../../assets/bag.png";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WelcomeCard() {
  return (
    <div className="wrapper">
      <h2 className="card-heading">Welcome to Findora !</h2>
      <div className="sub-wrapper">
        <div>
          <p className="card-para">
            Reconnect lost items with rightful owners around the campus.
          </p>
        </div>
        <div className="welcome-img">
          <img src={bag} alt="bag-img" className="welcome-card-image" />
        </div>
      </div>

      <Link to="/report" className="card-link">
        <button className="card-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="maginifying-glass" /> Report Item </button>
      </Link>
    </div>
  );
}

export default WelcomeCard;
