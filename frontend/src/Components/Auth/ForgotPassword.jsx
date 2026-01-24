import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../Styles/ForgotPassword.css";
import forgotPassword from "../../assets/forgotPassword.png";
import Footer from "../Common/Footer";
import axios from 'axios'

function ForgotPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // updated function to send email to the backend
  const onSubmit = async (data) => {
    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/forgot-password/",
        {
          email: data.email
        }
      );

      alert(response.data.message)
      reset();
    } catch (error) {
      alert("Something went wrong. Please try again.")
      console.log(error);
    }
  }

  // const onSubmit = (data) => {
  //   console.log("Form submitted successfully.");
  //   console.log(data);
  // };

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
              {...register("email", {
                required: "Email is required.",
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="forgot-submit-btn">
              Send Reset Link
            </button>
          </div>

          <div className="forgot-end-link">
            <p className="forgot-ques">Remember your password?</p>
            <Link to="/login" className="forgot-link">
              Login
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ForgotPassword;
