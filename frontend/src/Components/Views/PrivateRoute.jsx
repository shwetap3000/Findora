import { Navigate } from 'react-router-dom'

// should always be children because by default react convert it into the children
const PrivateRoute = ({ children }) => {
    
    // getting access token from the local storage which we had stored while login
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // navigate to login page if the user is not logged in 
        return <Navigate to='/login' />
    }

    // if the user is logged-in then return the requested page
    return children;
}

export default PrivateRoute;




// was using 'Page' instead of 'children' when passing it as a prop hence was getting error -> the page was not getting displayed, only navbar and footer was visible.