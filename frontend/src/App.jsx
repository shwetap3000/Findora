import "./App.css";
import Claim_Item from "./Components/Claim_Form/Claim_Item";
import Navbar from "./Components/Common/Navbar";
import Views from "./Components/Views/Views";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Views />
      {/* <Claim_Item /> */}
    </div>
  )
}

export default App



























// function App() {
//   return (
//     // <Login />
//     <SignUp />
//   )
// }

// export  default App


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   return (
//     // here we will use the fragment instead of Router as we have already used the BrowserRouter in our main.jsx

//     <>{isLoggedIn === true ? <PrivateView /> : <PublicView />}</>
//   );
// }

// export default App;



// import React from 'react'
// import Axios from './Components/Axios'

// function App() {
//   return (
//     <Axios />
//   )
// }

// export default App
