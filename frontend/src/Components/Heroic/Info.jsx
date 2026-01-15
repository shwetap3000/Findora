import React, { useState } from 'react'
import '../../Styles/Info.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp, faBell } from "@fortawesome/free-solid-svg-icons";
import ActiveUser from './ActiveUser';
import TotalItems from './TotalItems';

function Info() {

    // useEffect function to fetch the total count of active users
    <ActiveUser />

    const [totalItems, setTotalItems] = useState(0);
    const [successfullyReceived, setSuccessfullyReceived] = useState(0);

  return (
    <div className='info-wrapper'>
        <ActiveUser />
        <TotalItems />
        
        <div className='info-card received-card'>
            <FontAwesomeIcon icon={faThumbsUp} className='faThumbsUp'/>
            <p>Successfully Received: {successfullyReceived}</p>
        </div>
    </div>
  )
}

export default Info
