import { useForm } from "react-hook-form";
import "../../Styles/Login.css";
import "../../Styles/Report.css";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Login() {
  // usestate to store the login result
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // clear previous message
      setSuccess("");
      setError("");

      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // store jwt refresh and access token
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      alert("Logged-in successfully!");

      // after login navigate to profile page
      navigate("/profile");

      // set success message
      // console.log("Logged-in successfully", response.data);
      setSuccess("Logged-in successfully");
    } catch (error) {
      // clear success message and set error message
      setSuccess("");
      setError("Invalid email or password");
      console.log("Failed: ", error.response.data);
      console.log("Failed: ", error);
    }
  };

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

  return (
    <div>
      <div className="form-wrapper">
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <label className="form-label">
              Email <sup className="imp-mark">*</sup>
            </label>

            {/* registered name must be same as the field name in backend view */}
            <input
              className="form-input"
              type="text"
              {...register("email", {
                required: "Email is required.",
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="form-fields">
            <label className="form-label">
              Password <sup className="imp-mark">*</sup>
            </label>

            <input
              className="form-input"
              type="password"
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

            <Link>Forgot Password ?</Link>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>

          <div>
            <p>Don't have an account?</p>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
