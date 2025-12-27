import React from "react";
import { useForm } from "react-hook-form";

function DemoForm() {
  // To manage form state and validation easily without writing a lot of boilerplate code
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      {/* Handles form submission */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name : </label>
          {/* register the input field so that it get connected to the form */}
          {/* firstName is the name of the field (can be anything) */}
          <input
            type="text"
            {...register("firstName", {
              required: true,
              minLength: { value: 3, message: "Min length must be 3"},
              maxLength: {value: 6, message: "Max length can atmost be 6"},
            })}
          />

          {/* error handling */}
          { errors.firstName && <p>{ errors.firstName.message }</p> }
        </div>

        <div>
          <label>Last Name : </label>
          <input
            type="text"
            {...register("lastName", {
              required: true,
              minLength: { value: 3, message: "Min length must be 3"},
              maxLength: { value: 6, message: "Max length can atmost be 6"},
            })}
          />
          { errors.lastName && <p>{ errors.lastName.message }</p>}
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default DemoForm;

// List of validation rules supported :

// required
// min
// max
// minLength
// maxLength
// pattern
// validate
