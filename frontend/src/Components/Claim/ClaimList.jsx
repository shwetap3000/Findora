import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/auth";
import ClaimCard from "./ClaimCard";

function ClaimList() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const res = await axios.get(
        "http://127.0.0.1:8000/claims/my-items/",
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      setClaims(res.data);
    };

    fetchClaims();
  }, []);

  return (
    <div>
      <h2>Claims on Your Items</h2>

      {claims.length === 0 && <p>No claims yet</p>}

      {claims.map((claim) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
}

export default ClaimList;
