import React, { useState } from "react";
import "../../Styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapPin,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import SearchBox from "./SearchBox";
import CategoryBtns from "./CategoryBtns";

// // Array of objects of all the items - (for static data)
// // import from "./Items";
// const items = Items;

function Dashboard() {
  return (
    <div>
      <SearchBox />
    <CategoryBtns />
    </div>
  )
}

export default Dashboard;
