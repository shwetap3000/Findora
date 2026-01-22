import { useForm } from "react-hook-form";
import "../../Styles/Login.css";
import "../../Styles/Report.css";
import axios from "axios";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Footer from "../Common/Footer";
import loginImg from "../../assets/loginPage.png";

function Login() {
  // to navigate the page after successful login
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  // state variable to store the login status (for showing successful or invalid credentials message)
  const [loginStatus, setLoginStatus] = useState(null);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginStatus("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",

        // this should be like this only bcoz the backend accepts the data in this format only else it will give an error (it should be email and password only as we have used the same name in the accounts login serializer)
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      navigate("/profile");
    } catch (error) {
      // console.log("Error: ", error);
      setLoginStatus("error");

      // scroll to top behaviour on button click (as the error message will be shown up)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    reset();
  };

  console.log(loginStatus)

  return (
    <div>
      {
        loginStatus === "error" && 
        <div className="login-failed">
          "Invalid login credentials."
        </div>
      }

      <div className="login-form-wrapper">
      
        <form onSubmit={handleSubmit(onSubmit)} className="login-sub-wrapper">
          <div className="login-welcome">
            <h2 className="login-welcome-header">Welcome Back!</h2>
            <img src={loginImg} alt="login-img" className="login-img" />
          </div>

          <div className="login-form-fields">
            <label className="login-form-label">
              Email <sup className="imp-mark">*</sup>
            </label>

            {/* registered name must be same as the field name in backend view */}
            <input
              className="login-form-input"
              placeholder="Enter your email"
              type="text"
              {...register("email", {
                required: "Email is required.",
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="login-form-fields">
            <label className="login-form-label">
              Password <sup className="imp-mark">*</sup>
            </label>

            <div className="login-password-wrapper">
              <input
                className="login-form-input"
                placeholder="Enter your password"
                type={isVisible === true ? "text" : "password"}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 5,
                    message: "Password must be 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 30 characters",
                  },
                })}
              />

              {isVisible === true ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="login-password-eye"
                  onClick={handleVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="login-password-eye"
                  onClick={handleVisibility}
                />
              )}
            </div>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}

            <Link to="/forgot-password" className="login-forgot-link">
              Forgot Password?
            </Link>
          </div>

          <div>
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </div>

          <div className="login-end-link">
            <p className="login-ques">New to Findora?</p>

            <Link to="/signup" className="signup-link">
              Create an account
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;

// // usestate to store the login result
// const [success, setSuccess] = useState("");
// const [error, setError] = useState("");

// const onSubmi = async (data) => {
//   try {
//     // // clear previous message
//     // // we are using this becuase if we have success message and then try to login with invalid credentials then both messages will be shown
//     // setSuccess("");
//     // setError("");

//     const response = await axios.post(
//       "http://127.0.0.1:8000/accounts/login/",
//       // "http://192.168.1.4:8000/accounts/login/",
//       {
//         email: data.email,
//         password: data.password,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     // store jwt refresh and access token
//     localStorage.setItem("accessToken", response.data.access);
//     localStorage.setItem("refreshToken", response.data.refresh);
//     // alert("Logged-in successfully!");

//     // after login navigate to profile page
//     navigate("/profile");

//     // set success message
//     // console.log("Logged-in successfully", response.data);
//     // setSuccess("Logged-in successfully");
//   } catch (error) {
//     // // clear success message and set error message
//     // // clearing success msg so that it is never shown on failure
//     // setSuccess("");
//     // setError("Invalid email or password");
//     console.log("Failed: ", error.response.data);
//     console.log("Failed: ", error);
//   }
// };

//   const onSubmit = (data) => {
//     alert("Form Submitted successfully");
//     console.log(data);
//   }

// // sending data to django backend for authentication
// const onSubmit = async (data) => {
//   // const formData = {
//   //     email: data.email,
//   //     password: data.password
//   // }
//   // const formData = new FormData

//   await axios.post(
//     "http://127.0.0.1:8000/accounts/login/",
//     {
//       email: data.email,
//       password: data.password,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   // // LoginView url form accounts app
//   // await axios.post('', formData);
//   // alert("Form submitted successfully");

//   // console.log(formData);
//   // reset();
// };
