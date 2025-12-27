import React from 'react'
import '../../Styles/Features.css'

function Cards({data}) {
  return (
    <div className='feature-card'>
      <h4>{data.title}</h4>
      <p>{data.desc}</p>
    </div>
  )
}

export default Cards