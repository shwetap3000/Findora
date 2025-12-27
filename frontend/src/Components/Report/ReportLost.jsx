import React from "react";
import '../../Styles/Report.css';
import { useForm } from "react-hook-form";

function ReportLost() {
  // to handle the form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // to handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title field */}
        <div className="form-fields">
          <label className="form-labels">Title of item 
            <sup className="imp-mark">*</sup> 
            </label>

          <input
            type="text"
            className="form-input"
            {...register("title", {
              required: "Please enter the title of the item.",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters long.",
              },
              maxLength: {value: 50, message: "Title cannot exceed 50 characters."},
            })}
          />

          {errors.title && <p className="error-text">{errors.title.message}</p>}
        </div>

        {/* Descripition field */}
        <div className="form-fields">
          <label className="form-labels">Description
            <sup className="imp-mark">*</sup>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Describe the item (color, brand, any details)..."
            {...register("description", {
              required: "Please provide a description of the item.",
              minLength: {
                value: 3,
                message: "Description should contain more details.",
              },
              maxLength: { value: 500, message: "Description cannot exceed 500 characters." },
            })}
          />

          {errors.description && <p className="error-text">{errors.description.message}</p>}
        </div>

        {/* Date and Location fields */}
        
          <div className="form-fields">
            <label className="form-labels">Date Lost
              <sup className="imp-mark">*</sup>
            </label>
            <input
              type="date"
              className="form-input"
              {...register("date", {
                required: "Please select the date.",
              })}
            />

            {errors.date && <p className="error-text">{errors.date.message}</p>}

            {/* Future date : Date cannot be in the future. ---> To be Added */}
          </div>

          <div className="form-fields">
            <label className="form-labels">Location Lost
              <sup className="imp-mark">*</sup>
            </label>
            <input
              type="type"
              className="form-input"
              placeholder="Enter Location (e.g. Library, Canteen)"
              {...register("location", {
                required: "Please enter the location.",
                minLength: { value: 3, message: "Location name is too short." },
                maxLength: {value: 120, message: "Location cannot exceed 120 characters."}
              })}
            />

            {errors.location && <p className="error-text">{errors.location.message}</p>}
          </div>
      

        <div className="form-fields">
          <label className="form-labels">Additional Identifiers (Optional) </label>
          <input
            type="text"
            placeholder="e.g. Serial number, unique marks.."
            className="form-input"
            {...register("identifier")}
          />
        </div>

        <div className="form-fields">
          <label className="form-labels">Reward Offered (Optional)</label>
          <input
            type="text"
            placeholder="Enter reward"
            className="form-input"
            {...register("reward")}
          />
        </div>

        <div className="form-fields">
          <label className="form-labels">Upload Image (Optional)</label>
          <input
            type="file"
            placeholder="Enter reward"
            className="form-input file-input"
            {...register("reward")}
          />
        </div>

        <div className="radio-group">
          <label >Contact Preference :
            <sup className="imp-mark">*</sup>
          </label>

          <input
            type="radio"
            value="phone"
            {...register("contact", {
              required: "Please select a contact preference",
            })}
          />
          <label>Phone</label>

          <input
            type="radio"
            value="email"
              {...register("contact", {
              required: "Please select a contact preference",
            })}
          />
          <label>Email</label>
          
        </div>
        {errors.contact && <p className="error-text">{errors.contact.message}</p>}

        <div>
          <input type="submit" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}

export default ReportLost;
