import React, { useState } from "react";
import "../../Styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapPin,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ItemCard from "./ItemCard";
import sortedItems from "./Items";

// // Array of objects of all the items - (for static data)
// // import from "./Items";
// const items = Items;

function Dashboard() {

  // This should be inside the function component
  const items = sortedItems();

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

      {/* buttons to filter items */}

      {/* button to display all items */}
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

        {/* button to display lost items */}
        <button className="lost-items-btn" onClick={handleLostBtnClick}>
          <div className="btn-wrapper">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "red" }}
            />
            <h4>Lost Items</h4>
          </div>
        </button>

        {/* button to display found items */}
        <button className="found-items-btn" onClick={handleFoundBtnClick}>
          <div className="btn-wrapper">
            <FontAwesomeIcon icon={faMapPin} style={{ color: "green" }} />
            <h4>Found Items</h4>
          </div>
        </button>
      </div>

      {/* search box */}
      <div className="search-box-wrapper">
        <p>Search Your Item here...</p>
        <input type="text" placeholder="Search item..." className="search-box" />
      </div>

      {/* passed items and displayItems as props */}
      <ItemCard items={items} displayItems={displayItems} />
    </div>
  );
}

export default Dashboard;
