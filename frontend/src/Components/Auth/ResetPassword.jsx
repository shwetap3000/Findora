import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../Styles/ResetPassword.css";
import Footer from "../Common/Footer";

function ResetPassword() {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/accounts/reset-password/${token}/`,
        {
          password: data.password,
          confirm_password: data.confirm_password,
        }
      );

      alert(response.data.message);
      reset();

      // redirect to login
      navigate("/login");

    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="resetPass-form-wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="resetPass-sub-wrapper"
        >
          <div className="reset-welcome">
            <h2 className="reset-welcome-heading">Reset your password</h2>
            <p className="reset-para">
              Enter your new password below to reset your account password.
            </p>
          </div>

          <div className="reset-form-fields">
            <label className="reset-form-label">
              New Password <sup className="imp-mark">*</sup>
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="reset-form-input"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div className="reset-form-fields">
            <label className="reset-form-label">
              Confirm Password <sup className="imp-mark">*</sup>
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              className="reset-form-input"
              {...register("confirm_password", {
                required: "Please confirm your password.",
              })}
            />

            {errors.confirm_password && (
              <p className="error-text">{errors.confirm_password.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="reset-submit-btn">
              Reset Password
            </button>
          </div>

          <div className="reset-end-link">
            <Link to="/login" className="reset-link">
              Back to Login
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ResetPassword;
