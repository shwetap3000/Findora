import React from 'react'
import "../../Styles/About.css"
import { faBullseye, faClipboardCheck, faEnvelope, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info() {
  return (
    <div>
        <div className="missoin-wrapper">
        <div className="sub-mission-wrapper">
            <FontAwesomeIcon icon={faBullseye} className="misison-icon bulleye" />
            <h3 className="mission-heading">Mission</h3>
        </div>

        <p className="mission-para">
            The mission of Findora is to simplify campus lost and found by creating a secure, student-friendly platform that helps lost items reach their rightful owners quickly and responsibly.
        </p>
      </div>

      <div className="missoin-wrapper">
        <div className="sub-mission-wrapper">
            <FontAwesomeIcon icon={faClipboardCheck} className="misison-icon clipboard" />
            <h3 className="mission-heading">How It Work's</h3>
        </div>

        <p className="mission-para">
            <b>1. Report Lost or Found Item: </b> Add details about the item to make it visible to others.
        </p>
        <p className="mission-para">
            <b>2. Browse Items: </b> Search through reported items to find a possible match.
        </p>
        <p className="mission-para">
            <b>3. Reclaim Item: </b> Connect securely and recover the item.
        </p>
      </div>

       <div className="missoin-wrapper">
        <div className="sub-mission-wrapper">
            <FontAwesomeIcon icon={faStar} className="misison-icon star" />
            <h3 className="mission-heading">Why Choose Findora?</h3>
        </div>

        <p className="mission-para">
            <b>1. Minimal Effort: </b> No complicated steps or confusion.
        </p>
        <p className="mission-para">
            <b>2. Trusted Platform: </b> Built with privacy and safety in mind.
        </p>
        <p className="mission-para">
            <b>3. Real Result: </b> Focused on helping items reach their owners.
        </p>
      </div>

      <div className="missoin-wrapper">
        <div className="sub-mission-wrapper">
            <FontAwesomeIcon icon={faEnvelope} className="misison-icon envelope" />
            <h3 className="mission-heading">Contact Us</h3>
        </div>

        <p className="mission-para">
            Have questions or need assistance? Feel free to reach out to us at: <a href="mailto:findora.campus@gmail.com" className="official-mail">findora.campus@gmail.com</a>
        </p>
      </div>
    </div>
  )
}

export default Info