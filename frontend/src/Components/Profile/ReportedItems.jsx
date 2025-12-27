import React from "react";
import "../../Styles/ReportedItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faShield,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const LostItems = [
  {
    id: 1,
    title: "Blue Backpack",
    status: "Pending",
  },

  {
    id: 2,
    title: "Gold Ring",
    status: "Resolved",
  },
];

function ReportedItems() {
  return (
    <div className="reportedItems-card">
      <div className="reported-item-header">
        <FontAwesomeIcon icon={faList} className="header-logo" />
        <h2 className="user-heading">Your Reported Items</h2>
      </div>

      {LostItems.length === 0
        ? "No Reported Item"
        : LostItems.map((item) => (
            <div className="reported-items">
              <div className="lost-logo">
                {item.status === "Resolved" ? (
                  <FontAwesomeIcon icon={faShield} style={{ color: "green" }} />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "red" }}
                  />
                )}
              </div>

              <div className="reported-items-content">
                <h3 className="reported-items-title">{item.title}</h3>
                <p className="reported-items-status">
                  Status:{" "}
                  <span
                    className={
                      item.status === "Resolved" ? "resolved" : "pending"
                    }
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ReportedItems;
