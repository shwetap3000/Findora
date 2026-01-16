import { useForm } from "react-hook-form";
import "../../Styles/Report.css";
import "../../Styles/SignUp.css";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

function SignUp() {
  // state varaible for handling hide and show password feature
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPassVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  

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
        }
      );

      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }

    reset();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-sub-wrapper">
        <div className="singup-welcome">
          <h2 className="singup-welcome-header">Create your account</h2>
          <p className="singup-welcome-para">
            Join your campus lost & found network
          </p>
        </div>

        <div className="form-fields">
          <label className="form-label">
            Username : <sup className="imp-mark">*</sup>
          </label>

          <input
            type="text"
            className="form-input"
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

        <div className="form-fields">
          <label className="form-label">
            Email : <sup className="imp-mark">*</sup>
          </label>

          <input
            type="email"
            className="form-input"
            {...register("email", {
              required: "Email is required.",
            })}
          />

          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-fields">
          <label className="form-label">
            Password : <sup className="imp-mark">*</sup>
          </label>

          <div className="password-wrapper">
            <input
              type={isPasswordVisible === true ? "text" : "password"}
              className="form-input"
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
                className="password-eye"
                onClick={handlePasswordVisibility}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="password-eye"
                onClick={handlePasswordVisibility}
              />
            )}
          </div>

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <div className="form-fields">
          <label className="form-label">
            Confirm Password : <sup className="imp-mark">*</sup>
          </label>

          <div className="password-wrapper">
            <input
              type={isConfirmPasswordVisible === true ? "text" : "password"}
              className="form-input"
              {...register("confirmPassword", {
                required: "Confirm Password is required.",
              })}
            />

            {isConfirmPasswordVisible === true ? (
              <FontAwesomeIcon
                icon={faEye}
                className="password-eye"
                onClick={handleConfirmPassVisibility}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="password-eye"
                onClick={handleConfirmPassVisibility}
              />
            )}
          </div>

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button className="submit-btn">Create account</button>
        </div>

        <div>
          <p className="signup-ques">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="signup-link">
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
  );
}

export default SignUp;
