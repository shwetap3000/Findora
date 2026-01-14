import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Page }) => {
    
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // navigate to login page if the user is not logged in 
        return <Navigate to='/' />
    }

    // if the user is logged-in then return the requested page
    return Page;
}

export default PrivateRoute;