import React, { useState } from "react";
import "../../Styles/Features.css";
import Cards from "./Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// data for features cards 
const features = [
  {
    id: 1,
    title: "feature 1",
    desc: "A carousel is NOT many components moving It is usually one container moving horizontally while overflow is hidden.",
  },

  {
    id: 2,
    title: "feature 2",
    desc: "A carousel is NOT many components moving It is usually.",
  },

  {
    id: 3,
    title: "feature 3",
    desc: "one container moving horizontally while overflow is hidden.",
  },

  {
    id: 4,
    title: "feature 4",
    desc: "A overflow is hidden.",
  },

  {
    id: 5,
    title: "feature 5",
    desc: "A carousel is moving horizontally while overflow is hidden.",
  },
];

function Features() {

  // state variable to handle store the current index
  const [currIndex, setCurrIndex] = useState(0);


  // function to handle the forward slide by storing the index value
  const handleForwardClick = () => {
    setCurrIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));

    console.log("Clicked");
    console.log(features.length);
  };


  // function to handle the backward slide by storing the index value
  const handleBackwardclick = () => {
    setCurrIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div>
      
      <div className="feature-wrapper">
        {/* <h3 className="feature-heading">PLATFORM HIGHLIGHTS</h3> */}
        <span className="feature-span">WHY FINDORA?</span>
        <h4 className="feature-subHeading">Built to Make Recovery Easy</h4>
        <p className="feature-para">Simple, secure, and reliable features that help your campus recover lost items.</p>
      </div>
      
      {/* <button className="left-btn" onClick={handleBackwardclick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="right-btn" onClick={handleForwardClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      <div className="feature-cards"> */}
        {/* passing data to Cards component
        <Cards data={features[currIndex]} />
      </div> */}

      {/* <div className="feature-cards" >

            {features.map((feature) => (
          <Cards key={feature.id} data={feature} />
        ))}

        
      </div> */}
    </div>
  );
}

export default Features;
