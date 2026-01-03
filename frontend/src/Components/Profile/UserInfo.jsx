import React from "react";
import UserImg from "../../assets/test-account.jpg";
import "../../Styles/UserInfo.css";

function UserInfo() {

  // Dummy user data
  const UserData = [{ id: 1, name: "John Doe", email: "johndoe@gmail.com" }];

  const handleLogout = () => {
    // here we will make a logout request to the backend and clear the user session
    alert("Logout successfully!");
  };

  const handleEdit = () => {
    alert("Edited successfully!");
  };

  return (
    <div className="user-card">
      <img src={UserImg} alt="user" className="user-img" />

      <div className="user-info">
        {UserData.map((data) => (
          <>
            <h3 className="user-name">{data.name}</h3>
            <p className="user-email">{data.email}</p>
          </>
        ))}

        <div className="btns">
          <a href="#" className="logout-btn" onClick={handleLogout}>
            Logout
          </a>

          <a href="#" className="edit-btn" onClick={handleEdit}>
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
