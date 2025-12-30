// Combining the lost and found items into a single array of objects

import LostItems from "./LostItems";
import FoundItems from "./FoundItems";

function Items() {

  // lost and found items fetched from respective components
  const lostItems = LostItems();
  const foundItems = FoundItems();

  // combining both lost and found items into a single array of objects for easier mapping and display
  const allItems = [...lostItems, ...foundItems];

  return allItems;
}

export default Items








// // Static data for testing purposes

// // const Items = [
// //   {
// //     id: 1,
// //     title: "Blue Backpack",
// //     venue: "Library, 3rd floor",
// //     reported_at: "03-12-2025",
// //     status: "lost",
// //   },

// //   {
// //     id: 4,
// //     title: "Bottle",
// //     venue: "Canteen",
// //     reported_at: "03-12-2025",
// //     status: "found",
// //   },

// //   {
// //     id: 3,
// //     title: "DSA Notebook",
// //     venue: "306 classroom",
// //     reported_at: "05-12-2025",
// //     status: "found",
// //   },

// //   {
// //     id: 2,
// //     title: "Ring",
// //     venue: "Computer Lab, 3rd floor",
// //     reported_at: "04-12-2025",
// //     status: "lost",
// //   },

// //   {
// //     id: 5,
// //     title: "Laptop",
// //     venue: "Class-306",
// //     reported_at: "25-12-2025",
// //     status: "found",
// //   },
// // ];

// // export default Items;