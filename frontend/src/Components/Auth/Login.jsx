import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/Login.css";

function Login() {
  // state to handle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // function to toggle password visibility
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-wrapper">
      <div className="heading">
        <h2>Login to Your Account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              required: "Please enter your email address.",
            })}
          />

          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-fields">
          <label className="label-field">
            Password
            <sup className="imp-mark">*</sup>
          </label>

          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="form-input"
              {...register("password", {
                required: "Please enter your password.",
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters.",
                },
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long.",
                },

                // code to check for correct password
              })}
            />

            {/* Password visibility toggle */}
            {/* {isPasswordVisible ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={handlePasswordVisibility}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={handlePasswordVisibility}
              />
            )} */}

            <span
              className="password-toggle"
              onClick={handlePasswordVisibility}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </span>
          </div>

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>

        <hr className="form-divider" />
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
}

export default Login;
