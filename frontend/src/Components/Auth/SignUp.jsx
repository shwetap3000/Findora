import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPassVisibility = () => {
    setIsConfirmPassVisible(!isConfirmPassVisible);
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset;
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-welcome">
        <Link to="/">Findora</Link>
        <p>Subheading goes here</p>
      </div>

      <div>
        <div className="sigup-heading">
          <h2>Create a New Account</h2>
          <p>Join us today! Please fill in your details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <label className="label-field">
              Full Name
              <sup className="imp-mark">*</sup>
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="form-input"
              {...register("fullName", {
                required: "Please Enter your full name",
                maxLength: {
                  value: 60,
                  message: "Full Name cannot exceed 60 characters",
                },
                minLength: {
                  value: 5,
                  message: "Full Name should be atleast 5 characters long",
                },
              })}
            />

            {errors.fullName && (
              <p className="error-text">{errors.fullName.message}</p>
            )}
          </div>

          <div className="form-fields">
            <label className="label-field">
              Email Address
              <sup className="imp-mark">*</sup>
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              className="form-input"
              {...register("email", {
                required: "Please Enter your email address",
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="form-fields">
            <label className="label-field">
              Password
              <sup className="imp-mark">*</sup>
            </label>

            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="form-input"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long.",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters.",
                },
              })}
            />

            <span
              className="password-toggle"
              onClick={handlePasswordVisibility}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="form-fields">
            <label className="label-field">
              Confirm Password
              <sup className="imp-mark">*</sup>
            </label>

            <input
              type={isConfirmPassVisible ? "text" : "password"}
              placeholder="Enter your confirm password"
              className="form-input"
              {...register("confirm-password", {
                minLength: {
                  value: 6,
                  message: "Confirm password should be at least 6 characters long.",
                },
                maxLength: {
                  value: 20,
                  message: "Confirm password cannot exceed 20 characters.",
                },
              })}
            />

            <span
              className="confirmPass-toggle"
              onClick={handleConfirmPassVisibility}
            >
              <FontAwesomeIcon icon={isConfirmPassVisible ? faEye : faEyeSlash} />
            </span>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

          <hr className="form-divider"/>

          <p className="redirect-text">
            Already have an account?
            <Link to="/login"> Login</Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
