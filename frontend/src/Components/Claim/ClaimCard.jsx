import React from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/auth";

function ClaimCard({ claim }) {
  const updateStatus = async (status) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/claims/update/${claim.id}/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      alert(`Claim ${status}`);
      window.location.reload();
    } catch (error) {
      alert("Action failed");
    }
  };

  return (
    <div className="claim-card">
      <h4>Claimant: {claim.claimant_name}</h4>
      <p>{claim.claim_message}</p>

      {claim.status === "pending" && (
        <>
          <button onClick={() => updateStatus("approved")}>Approve</button>
          <button onClick={() => updateStatus("rejected")}>Reject</button>
        </>
      )}

      {claim.status === "approved" && (
        <>
          <p><strong>Email:</strong> {claim.contact_email}</p>
          <p><strong>Phone:</strong> {claim.contact_phone}</p>
        </>
      )}

      <p>Status: {claim.status.toUpperCase()}</p>
    </div>
  );
}

export default ClaimCard;
