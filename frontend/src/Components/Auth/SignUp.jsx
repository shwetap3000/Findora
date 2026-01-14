import { useForm } from "react-hook-form";
import "../../Styles/Report.css";

function SignUp() {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onSubmit = async (data) => {

    


  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-fields">
          <label className="form-label">
            Username : <sup className="imp-mark">*</sup>
          </label>

          <input 
          type="text" 
          className="form-input"
          {...register('username', {
            required: 'Username is required.',
            minLength: {value: 3, message: 'Username must be 3 characters long'},
            maxLength: {value: 30, message: 'Username cannot excced 30 characters.'},
          })}
          />

          {errors.username && (
            <p className="error-text">{ errors.username.message }</p>
          ) }
        </div>

        <div className="form-fields">
          <label className="form-label">
            Email : <sup className="imp-mark">*</sup>
          </label>

          <input 
          type="email" 
          className="form-input"
          {...register('email', {
            required: 'Email is required.',
          })}
          />

          {errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}

        </div>

        <div className="form-fields">
          <label className="form-label">
            Password : <sup className="imp-mark">*</sup>
          </label>

          <input 
          type="password" 
          className="form-input"
          {...register('password', {
            required: 'Password is required.',
            minLength: {value: 3, message: 'Password must be 8 characters long'},
            maxLength: {value: 30, message: 'Password cannot excced 30 characters.'},
          })}
          />

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          <div>
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
