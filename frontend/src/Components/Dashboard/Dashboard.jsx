import React, { useState } from "react";
import "../../Styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapPin,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ItemCard from "./ItemCard";
import Items from "./Items";

// // Array of objects of all the items
// for static data
// const items = Items;

function Dashboard() {

  // This should be inside the funciton component
  const items = Items();
  // console.log(items);


  // state variable to store the current value to be display
  const [clicked, setClicked] = useState("all");
  let displayItems;

  const handleLostBtnClick = () => {
    setClicked("lost");
  };

  const handleFoundBtnClick = () => {
    setClicked("found");
  };

  const handleAllBtnClick = () => {
    setClicked("all");
  };

  // condition to check if all items have to be displayed or not
  if (clicked === "all") {
    displayItems = items;
  } else {
    // filtering out the lost or found items according to the  button clicked
    displayItems = items.filter((item) => item.status === clicked);
  }

  // console.log(displayItems);

  return (
    <div>
      <h1 className="dashboard-main-heading">Item Dashboard</h1>

      <div className="btns-wrapper">
        <button className="all-items-btn" onClick={handleAllBtnClick}>
          <div className="btn-wrapper">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              style={{ color: "darkblue" }}
            />
            <h4>All Items</h4>
          </div>
        </button>

        <button className="lost-items-btn" onClick={handleLostBtnClick}>
          <div className="btn-wrapper">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "red" }}
            />
            <h4>Lost Items</h4>
          </div>
        </button>

        <button className="found-items-btn" onClick={handleFoundBtnClick}>
          <div className="btn-wrapper">
            <FontAwesomeIcon icon={faMapPin} style={{ color: "green" }} />
            <h4>Found Items</h4>
          </div>
        </button>
      </div>

      {/* passed items and displayItems as props */}
      <ItemCard items={items} displayItems={displayItems} />
    </div>
  );
}

export default Dashboard;
