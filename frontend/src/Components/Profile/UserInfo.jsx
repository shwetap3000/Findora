import React, { useState } from "react";
import UserImg from "../../assets/test-account.jpg";
import "../../Styles/UserInfo.css";
import { useNavigate } from "react-router-dom";

function UserInfo() {

  // Dummy user data
  const UserData = [{ id: 1, name: "John Doe", email: "johndoe@gmail.com" }];


  // custom logout confirmation and function
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogout(true);
  }

  const handleYes = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('Logout successfully');

    navigate("/");

    // // this wont work here because it only works when it is returned from a component and not in a fucntion
    // <Navigate to='/' />
  }

  const handleNo = () => {
    setIsLogout(false)
  }


  // // browser confirmation logout function
  // const handleLogout = () => {

  //   const confirmLogout = window.confirm('Are you sure you want to logout ?')

  //   if (confirmLogout) {
  //     localStorage.removeItem('accessToken');
  //     localStorage.removeItem('refreshToken');
      
  //     <Navigate to='/login' />
  //   }
  // }


  // // simple logout function
  // const handleLogout = () => {

  //   // clear the user session and delete the tokens
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');

  //   alert("Logout successfully!");
  // };

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

        {
          isLogout && (
            <div>
              <p>Are you sure you want to logout ?</p>
              <div>
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
                </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default UserInfo;
