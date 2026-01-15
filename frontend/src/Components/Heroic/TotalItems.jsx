import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function TotalItems() {
  const [totalLost, setTotalLost] = useState(0);
  const [totalFound, setTotalFound] = useState(0);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/lost/total_lost_items/"
        );

        setTotalLost(response.data.total_lost_items);
      } catch (error) {
        console.log("Fetching lost items failed: ", error);
      }
    };

    const fetchFoundItems = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/found/total_found_items/"
        );
        setTotalFound(response.data.total_found_items);
      } catch (error) {
        console.log("Fetching found items failed: ", error);
      }
    };

    fetchLostItems();
    fetchFoundItems();
  });

  const totalItems = totalLost + totalFound;

  return (
    <div className="info-card item-card">
      <FontAwesomeIcon icon={faBell} className="faBell" />
      <p>Total Items: {totalItems}</p>
    </div>
  );
}

export default TotalItems;
