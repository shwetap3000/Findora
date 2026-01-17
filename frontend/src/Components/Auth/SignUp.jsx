import { useForm } from "react-hook-form";
import "../../Styles/Report.css";
import "../../Styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Footer from "../Common/Footer";
import signupImg from "../../assets/signupPage.png";

function SignUp() {
  // state varaible for handling hide and show password feature
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPassVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/register/",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      );

      navigate('/login');

      // console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }

    reset();
  };

  return (
    <div>
      <div className="singup-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="signup-sub-wrapper">
          <div className="signup-welcome">
            <h2 className="signup-welcome-header">Create your account</h2>
            <img src={signupImg} alt="signUp-img" />
          </div>

          <div className="signup-form-fields">
            <label className="signup-form-label">
              Username : <sup className="imp-mark">*</sup>
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              className="signup-form-input"
              {...register("username", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "Username must be 3 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Username cannot excced 30 characters.",
                },
              })}
            />

            {errors.username && (
              <p className="error-text">{errors.username.message}</p>
            )}
          </div>

          <div className="signup-form-fields">
            <label className="signup-form-label">
              Email : <sup className="imp-mark">*</sup>
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="signup-form-input"
              {...register("email", {
                required: "Email is required.",
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="signup-form-fields">
            <label className="signup-form-label">
              Password : <sup className="imp-mark">*</sup>
            </label>

            <div className="signup-password-wrapper">
              <input
                type={isPasswordVisible === true ? "text" : "password"}
                placeholder="Create a password"
                className="signup-form-input"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 3,
                    message: "Password must be 8 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password cannot excced 30 characters.",
                  },
                })}
              />

              {isPasswordVisible === true ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="signup-password-eye"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="signup-password-eye"
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div className="signup-form-fields">
            <label className="signup-form-label">
              Confirm Password : <sup className="imp-mark">*</sup>
            </label>

            <div className="signup-password-wrapper">
              <input
                type={isConfirmPasswordVisible === true ? "text" : "password"}
                placeholder="Enter your confirm password"
                className="signup-form-input"
                {...register("confirmPassword", {
                  required: "Confirm Password is required.",
                })}
              />

              {isConfirmPasswordVisible === true ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="signup-password-eye"
                  onClick={handleConfirmPassVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="signup-password-eye"
                  onClick={handleConfirmPassVisibility}
                />
              )}
            </div>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button className="signup-submit-btn">Create account</button>
          </div>

          <div>
            <p className="signup-ques">
              Already have an account?{" "}
              <span>
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </span>
            </p>
          </div>

          <p className="signup-end-para">
            We respect your privacy. Your details are only used to help return
            lost items.
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp;
