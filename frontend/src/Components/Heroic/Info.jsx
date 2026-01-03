import React, { useState } from 'react'
import '../../Styles/Info.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp, faBell } from "@fortawesome/free-solid-svg-icons";

// here we will fetch the data from the backend and display it in the info cards


function Info() {

    const [totalItems, setTotalItems] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [successfullyReceived, setSuccessfullyReceived] = useState(0);

  return (
    <div className='info-wrapper'>
        <div className='info-card activeUser-card'>
            <FontAwesomeIcon icon={faUser} className='faUser'/>
            <p>Active Users: {activeUsers}</p>
        </div>

        <div className='info-card item-card'>
            <FontAwesomeIcon icon={faBell} className='faBell'/>
            <p>Total Items: {totalItems}</p>
        </div>
        
        <div className='info-card received-card'>
            <FontAwesomeIcon icon={faThumbsUp} className='faThumbsUp'/>
            <p>Successfully Received: {successfullyReceived}</p>
        </div>
    </div>
  )
}

export default Info
