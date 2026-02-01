import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAccessToken } from "../../utils/auth";
import "../../Styles/ClaimForm.css";


function ClaimForm() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const token = localStorage.getItem("accessToken");
  console.log("Access Token: ", token);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/claim/create/${itemId}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          },
        }
      );

      alert("Claim submitted successfully!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.detail || "Error submitting claim");
    }
  };

  return (
    <div className="claim-form-wrapper">
      <h2>Claim Item</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="Describe details only the real owner knows"
          {...register("claim_message", { required: true })}
        />

        <input
          type="email"
          placeholder="Your email (optional)"
          {...register("contact_email")}
        />

        <input
          type="text"
          placeholder="Your phone (optional)"
          {...register("contact_phone")}
        />

        <button type="submit">Submit Claim</button>
      </form>

      <p className="claim-hint">
  Only provide details that prove the item belongs to you.
</p>
    </div>
  );
}

export default ClaimForm;
