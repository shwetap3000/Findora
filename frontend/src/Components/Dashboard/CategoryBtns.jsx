import { useState } from "react";
import ItemCard from "./ItemCard";
import sortedItems from "./Items";

function CategoryBtns() {
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
      {/* buttons to filter items */}

      <div className="filter-bar">
        <button
          className={`filter-btn ${clicked === "all" ? "active" : ""}`}
          onClick={handleAllBtnClick}
        >
          All
        </button>

        <button
          className={`filter-btn lost ${clicked === "lost" ? "active" : ""}`}
          onClick={handleLostBtnClick}
        >
          Lost
        </button>

        <button
          className={`filter-btn found ${clicked === "found" ? "active" : ""}`}
          onClick={handleFoundBtnClick}
        >
          Found
        </button>
      </div>

      {/* passed items and displayItems as props */}
      <ItemCard items={items} displayItems={displayItems} />
    </div>
  );
}

export default CategoryBtns;
