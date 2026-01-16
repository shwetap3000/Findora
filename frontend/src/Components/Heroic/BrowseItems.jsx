import React from 'react'
import '../../Styles/BrowserItems.css';
import {Link} from 'react-router-dom';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BrowseItems() {
  return (
    <div className='browser-items-wrapper'>
        <button className='browser-items-btn'>
            <Link to='/dashboard' className='browser-link'>Browse Lost & Found Items</Link> 
            <FontAwesomeIcon icon={faArrowRightToBracket} style={{color: 'white'}} />
        </button>
    </div>
  )
}

export default BrowseItems