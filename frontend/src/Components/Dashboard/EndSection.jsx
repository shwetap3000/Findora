import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Styles/Dashboard.css'

function EndSection() {
  return (
    <div className='dashboard-end-wrapper'>
        <FontAwesomeIcon icon={faCircleCheck} className='dashbord-end-icon'/>
        <h3 className='dashboard-end-header'>You've reached the end</h3>
        <p className='dashboard-end-para'>No more items to display</p>
    </div>
  )
}

export default EndSection;