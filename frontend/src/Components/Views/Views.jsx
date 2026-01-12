import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Heroic from "../Heroic/Heroic";
import Dashboard from "../Dashboard/Dashboard";
import Report from "../Report/Report";
import Profile from "../Profile/Profile";
import Footer from "../Common/Footer";
import PrivateRoute from "./PrivateRoute";

function Views() {
  return (
    <div className="page">
      <main className="content">
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Heroic />} />
          <Route path="/dashboard" element={<Dashboard />} />

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
