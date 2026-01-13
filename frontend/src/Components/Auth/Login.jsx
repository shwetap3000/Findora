import { useForm } from "react-hook-form";
import "../../Styles/Login.css";
import "../../Styles/Report.css";
import axios from "axios";

function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const onSubmit = (data) => {
  //     alert("Form Submitted successfully");
  //     console.log(data);
  //   }

  // sending data to django backend for authentication
  const onSubmit = async (data) => {
    // const formData = {
    //     email: data.email,
    //     password: data.password
    // }
    // const formData = new FormData

    await axios.post(
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

    // // LoginView url form accounts app
    // await axios.post('', formData);
    // alert("Form submitted successfully");

    // console.log(formData);
    // reset();
  };

  return (
    <div>
      <div className="form-wrapper">
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
                  message: "Full Name must be 5 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Full Name must not exceed 30 characters",
                },
              })}
            />

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
