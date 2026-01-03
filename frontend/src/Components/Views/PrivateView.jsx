import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Common/Navbar'
import Heroic from '../Heroic/Heroic'
import Dashboard from '../Dashboard/Dashboard'
import Report from '../Report/Report'
import Profile from '../Profile/Profile'
import Footer from '../Common/Footer'


function PrivateView() {
  return (
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
  )
}

export default PrivateView