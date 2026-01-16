import React, { useState } from 'react'
import '../../Styles/Info.css'
import ActiveUser from './ActiveUser';
import TotalItems from './TotalItems';

function Info() {

  return (
    <div className='info-wrapper'>
        <ActiveUser />
        <TotalItems />
    </div>
  )
}

export default Info
