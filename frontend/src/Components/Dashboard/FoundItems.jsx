// Dynamic daata fetching from backend API

import React, { useEffect, useState } from 'react'
import axios from 'axios';

function FoundItems() {

    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/found/");
                setFoundItems(response.data);

            } catch (error) {
                console.error("Error fetching found items:", error);
            }
        };

        fetchFoundItems();
    }, []);

  return foundItems;
}

export default FoundItems;