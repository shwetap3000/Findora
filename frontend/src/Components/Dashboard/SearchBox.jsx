import React, { useState } from "react";
import sortedItems from "./Items";

import ItemCard from "./ItemCard";

function SearchBox() {
  // useState to keep track of searching value
  const [search, setSearch] = useState("");

  // all lost and found items
  const Items = sortedItems();

  // function to handle search filter
  const filterItems = Items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      
    </div>
  );
}

export default SearchBox;
