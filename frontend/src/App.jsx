import React from "react";
import Navbar from "./Components/Common/Navbar";
import Heroic from "./Components/Heroic/Heroic";
import Profile from "./Components/Profile/Profile";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Report from "./Components/Report/Report";
import Footer from "./Components/Common/Footer";
import './App.css'

function App() {
  return (

    // here we will use the fragment instead of Router as we have already used the BrowserRouter in our main.jsx
    
    <div className="page">
      <main className="content">
        <Navbar />

      <Routes>
        <Route path="/" element={<Heroic />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
      </main>
    </div>
  );
}

export default App;



// import React from 'react'
// import Axios from './Components/Axios'

// function App() {
//   return (
//     <Axios />
//   )
// }

// export default App