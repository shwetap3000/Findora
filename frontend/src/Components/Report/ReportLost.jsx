import "../../Styles/Report.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function ReportLost() {
  // to handle the form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // to handle form submission but we are using for loop to handle image field separately
  const onSubmit = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      if (key === "image") {
        if (data.image && data.image.length > 0) {
          formData.append(key, data.image[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    await axios.post("http://127.0.0.1:8000/lost/add_lost_items/", formData);
    reset();

    // scroll to top on report submission
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    // console.log(formData);
  };

  // // states to store form data to send to backend
  // // instead of using so many usestate we use one state object
  // // we wont be using this as we are using rhf.. instead we use data which internally contains all the fields
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   date: "",
  //   location: "",
  //   additional_identifiers: "",
  //   reward: "",
  //   image: "",
  //   contact_type: "",
  // })

  // // an universal handleChange fucntion
  // // we wont be using this as we are using react-hook-form -- rhf handles this internally
  // const handleChange = (e) => {
  //   // destructure name and value from event target
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // // to handle form submission
  // // not using this bcoz we have a special image field which needs to be handled separately
  // const onSubmit = (data) => {
  //   console.log(data);

  //   // post method to send data to backend
  //   axios.post("http://127.0.0.1:8000/lost/add_lost_items/", item_data)
  // };

  return (
    <div className="form-wrapper">
      {/* form to report lost item */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title field */}
        <div className="form-fields">
          <label className="form-labels">
            Title of item
            <sup className="imp-mark">*</sup>
          </label>

          <input
            type="text"
            className="form-input"
            placeholder="Enter the title of the item"
            // keep this name same as fields name in backend (django models) to avoid error while sending data to backend
            {...register("title", {
              required: "Please enter the title of the item.",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters long.",
              },
              maxLength: {
                value: 50,
                message: "Title cannot exceed 50 characters.",
              },
            })}
          />

          {errors.title && <p className="error-text">{errors.title.message}</p>}
        </div>

        {/* Descripition field */}
        <div className="form-fields">
          <label className="form-labels">
            Description
            <sup className="imp-mark">*</sup>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Brief public description of the item"
            {...register("description", {
              required: "Please provide a description of the item.",
              minLength: {
                value: 3,
                message: "Description should contain more details.",
              },
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters.",
              },
            })}
          />

          {errors.description && (
            <p className="error-text">{errors.description.message}</p>
          )}

           <p className="helper-text">Do not include private or ownership-proof details (e.g., serial numbers, contents, unique marks). These will be asked during the claim process.</p>
        </div>

        {/* Date and Location fields */}

        <div className="form-fields">
          <label className="form-labels">
            Date Lost
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
          <label className="form-labels">
            Location Lost
            <sup className="imp-mark">*</sup>
          </label>
          <input
            type="type"
            className="form-input"
            placeholder="Enter Location (e.g. Library, Canteen)"
            {...register("location", {
              required: "Please enter the location.",
              minLength: { value: 3, message: "Location name is too short." },
              maxLength: {
                value: 120,
                message: "Location cannot exceed 120 characters.",
              },
            })}
          />

          {errors.location && (
            <p className="error-text">{errors.location.message}</p>
          )}
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
            {...register("image")}
          />
        </div>

        <div className="radio-group">
          <label>
            Contact Preference :<sup className="imp-mark">*</sup>
          </label>

          <input
            type="radio"
            value="phone"
            {...register("contact_type", {
              required: "Please select a contact preference",
            })}
          />
          <label>Phone</label>

          <input
            type="radio"
            value="email"
            {...register("contact_type", {
              required: "Please select a contact preference",
            })}
          />
          <label>Email</label>
        </div>
        {errors.contact && (
          <p className="error-text">{errors.contact.message}</p>
        )}

        <div>
          <button type="submit" className="submit-btn">
            Report Lost
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportLost;
