import React from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import "../../Styles/ForgotPassword.css";
import forgotPassword from "../../assets/forgotPassword.png";

function ForgotPassword() {
  const { handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted successfully.");
  };

  return (
    <div>
      <div className="forgotPass-form-wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgotPass-sub-wrapper"
        >
          <div className="forgot-welcome">
            <h2 className="forgot-welcome-heading">Forgot your password?</h2>
            <img
              src={forgotPassword}
              alt="forgot-password-img"
              className="forgot-img"
            />
            <p className="forgot-para">
              Enter your email address below and we'll send you a link to reset
              your password.
            </p>
          </div>

          <div className="forgot-form-fields">
            <label className="forgot-form-label">
              Email: <sup className="imp-mark">*</sup>
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              className="forgot-form-input"
            />
          </div>

          <div>
            <button type="submit" className="forgot-submit-btn">
              Send Reset Link
            </button>
          </div>

          <div className="forgot-end-link">
            <p className="forgot-ques">
                Remember your password?
            </p>
            <Link to='/login' className="forgot-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
