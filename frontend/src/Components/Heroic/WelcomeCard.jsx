import React from "react";
import { Link } from 'react-router-dom';
import "../../Styles/WelcomeCard.css";

function WelcomeCard() {
  return (
    <div className="wrapper">
      <h2 className="card-heading">Welcome to Findora !</h2>
      <p className="card-para">
        The quickest way to reconnect lost items with their rightful owners.
        Let's find what matters.
      </p>

      <Link to='/report' className="card-link">
      <button className="card-btn">Report Item </button>
      </Link>
    </div>
  );
}

export default WelcomeCard;
