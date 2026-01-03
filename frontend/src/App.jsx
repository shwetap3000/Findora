import { useState } from "react";
import "./App.css";
import PrivateView from "./Components/Views/PrivateView";
import PublicView from "./Components/Views/PublicView";
import Login from "./Components/Auth/Login";

function App() {
  return (
    <Login />
  )
}

export  default App


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
