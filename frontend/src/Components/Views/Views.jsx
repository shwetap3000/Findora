import { Route, Routes } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Heroic from "../Heroic/Heroic";
import Dashboard from "../Dashboard/Dashboard";
import Report from "../Report/Report";
import Profile from "../Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import About from "../About/About";
import ScrollToTop from "./ScrollToTop";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import ClaimForm from "../Claim/ClaimForm";
import ClaimList from "../Claim/ClaimList";

function Views() {
  return (
    <div className="page">
      <main className="content">
        <Navbar />

        <ScrollToTop />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Heroic />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

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

          <Route
            path="/claim/:itemId"
            element={
              <PrivateRoute>
                <ClaimForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-claims"
            element={
              <PrivateRoute>
                <ClaimList />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default Views;
