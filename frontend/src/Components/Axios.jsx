// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Axios() {
//     // State to hold the fetched items
//   const [item, setItem] = useState([]);

//   // Fetch data from the backend API when the component mounts
//   // we cant use async directly in useEffect so we will create a function inside it and call it immediately
//   useEffect(() => {
//     const fetchData = async () => {

//         // using try catch to handle errors
//         // we are using axios to make the get request
//       try {
//         // Make GET request to the backend API
//         // we have to use the full url as the frontend and backend are running on different ports
//         const response = await axios.get("http://127.0.0.1:8000/lost/");

//         // Update state with the fetched data
//         setItem(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(item);

//   return (
//     <div>
//       <h2>Items</h2>
//       {item.map((itm) => (
//         <div key={itm.id}>
//           <h3>{itm.title}</h3>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Axios;






// get method to fetch data from backend

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function Axios() {

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/lost/");
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [])

//   console.log(data);

//   return (
//     <div>
//       <h3>Data : </h3>
//       {
//         data.map((dt) => (
//           <div key={dt.id}>
//             <h4>{dt.title}</h4>
//             </div>
//         ))
//       }
//     </div>
//   )
// }

// export default Axios






// post method to send data to backend (not savind in database yet)

import React, { useState } from 'react'
import axios from 'axios'

function Axios() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(""); 

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/lost/add_items/",
                {
                    title: title,
                    description: desc,
                }
            );

            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error message: ", error);
        }
    };

  return (
    <div>
        <input 
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Axios