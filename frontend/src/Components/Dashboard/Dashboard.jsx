import React, { useState } from "react";
import "../../Styles/Dashboard.css";
import SearchBox from "./SearchBox";
import CategoryBtns from "./CategoryBtns";

// // Array of objects of all the items - (for static data)
// // import from "./Items";
// const items = Items;

function Dashboard() {
  return (
    <div>
    <CategoryBtns />
    </div>
  )
}

export default Dashboard;
