// Dynamic data fetching from backend API

import axios from 'axios';
import React, { useEffect, useState } from 'react'

function LostItems() {

    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/lost/");
                setLostItems(response.data);
            } catch (error) {
                console.error("Error fetching lost items:", error);
            }
        };

        fetchLostItems();
    }, [])

  return lostItems
}

export default LostItems;