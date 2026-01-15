import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ActiveUser() {
  const [totalUsers, setTotalUsers] = useState(0);

  // we can't make the useEffect as the async fucntion hence we define another fucntion in it.
  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        // get does not take data
        const response = await axios.get(
          "http://127.0.0.1:8000/accounts/total_users/",

        // // no need of this as we have to keep this information public
        //   {
        //     headers: {
        //       Authorization: `Bearer ${access_token}`,
        //     },
        //   }
        );

        // 'total_users' should exactly same as it is there in views.py
        setTotalUsers(response.data.total_users);
          
      } catch (error) {
        console.log("User fetching failed: ", error.message);
        console.log("User fetching failed: ", error.response);
        // console.log("Token:", localStorage.getItem('accessToken'))
      }
    };

    fetchActiveUser();
  }, []);

  return (
    <div className="info-card activeUser-card">
      <FontAwesomeIcon icon={faUser} className="faUser" />
      <p>Active Users: {totalUsers}</p>
    </div>
  );
}

export default ActiveUser;





// // axios.post format : axios.post(url, data, config) hence this code is giving error becuase we are passing the header on the place of data
        // const response = await axios.get(
        //   "http://127.0.0.1:8000/accounts/total_users/",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${access_token}`,
        //     },
        //   }
        // );