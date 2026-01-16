import React from 'react'
import WelcomeCard from './WelcomeCard'
import Info from './Info'
import Features from './Features'
import EndSection from './EndSection'
import BrowseItems from './BrowseItems'

function Heroic() {
  return (
    <div>
        <WelcomeCard />
        <Info />
        <Features />
        <BrowseItems />
        
        {/* <EndSection /> */}
    </div>
  )
}

export default Heroic;