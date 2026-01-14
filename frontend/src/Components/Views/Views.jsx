import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Heroic from "../Heroic/Heroic";
import Dashboard from "../Dashboard/Dashboard";
import Report from "../Report/Report";
import Profile from "../Profile/Profile";
import Footer from "../Common/Footer";
import PrivateRoute from "./PrivateRoute";
import Login from "../Auth/Login";
// import SignUp from "../Auth/SignUp";

function Views() {
  return (
    <div className="page">
      <main className="content">
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Heroic />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* <Route path="/report" element={<Report />} />
          <Route path="/profile" element={<Profile />} /> */}

          {/* Private routes */}
           <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          /> 
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default Views;
