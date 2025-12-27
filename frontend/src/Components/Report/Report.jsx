import React, { useState } from 'react'
import ReportLost from './ReportLost';
import ReportFound from './ReportFound';

function Report() {

  // state variable to store the selected value
  const [selected, setSelected] = useState("lost");

  const handleReportLost = () => {
    setSelected("lost");
  }

  const handleReportFound = () => {
    setSelected("found");
  }

  // console.log(selected);

  return (
    <div className='report-page'>
      <h2>Report an Item</h2>

      <div className="report-btn-wrapper">
        <button className={`report-lost-btn ${selected === 'lost' ? 'active' : ''}`} 
        onClick={handleReportLost}>
          I Lost Something
        </button>

        <button className={`report-found-btn ${selected === 'found' ? 'active' : ''}`}
        onClick={handleReportFound}>
          I Found Something
        </button>
      </div>

      {/* condition to render the ReportLost or ReportFound component */}
      {
        selected === "lost" ? <ReportLost /> : <ReportFound />
      }
      
    </div>
  )
}

export default Report