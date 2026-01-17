import { useState } from "react";
import ItemCard from "./ItemCard";
import sortedItems from "./Items";
import EndSection from "./EndSection";
// import maginifyingGlass from "../../assets/maginifyingGlass.svg";

function CategoryBtns() {
  // This should be inside the function component
  const items = sortedItems();

  // state variable to store the current value to be display
  const [clicked, setClicked] = useState("all");
  // state varibale to store the search box's value
  const [search, setSearch] = useState("");

  const displayItems = items
    .filter((item) => clicked === "all" || item.status === clicked)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="dashboard-wrapper">
      {/* Search Box */}

      {/* <img src={maginifyingGlass} alt="magnifyingGlass" /> */}

      <input
        type="text"
        placeholder="Search lost & found items...."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* buttons to filter items */}

      <div className="filter-bar">
        <button
          className={`filter-btn ${clicked === "all" ? "active" : ""}`}
          onClick={() => setClicked("all")}
        >
          All
        </button>

        <button
          className={`filter-btn lost ${clicked === "lost" ? "active" : ""}`}
          onClick={() => setClicked("lost")}
        >
          Lost
        </button>

        <button
          className={`filter-btn found ${clicked === "found" ? "active" : ""}`}
          onClick={() => setClicked("found")}
        >
          Found
        </button>
      </div>

      {displayItems.length === 0 ? (
        <p className="no-items">No items found.</p>
      ) : (
        //  passed displayItems as props
        <div>
          <ItemCard displayItems={displayItems} />
          <EndSection />
          </div>
      )}

    </div>
  );
}

export default CategoryBtns;
