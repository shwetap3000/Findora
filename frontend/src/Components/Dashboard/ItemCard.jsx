import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../../Styles/Dashboard.css';

// items and displayItems are being passed as props from CategoryBtns.jsx
function ItemCard({ items, displayItems }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleClaim = (itemId) => {
    navigate(`/claim/${itemId}`);
  };

  return (
    <div className="items-wrapper">

      {/* while mapping over the items the name should be same as the fields name in django */}
        {displayItems.map((item) => (
          <div className="dashboard-item-card" key={item.id}>
            <div className="item-header">
              <h3 className="item-title">{item.title}</h3>
              <span className={`item-status ${item.status}`}>
                {item.status.toUpperCase()}
              </span>
            </div>

            <p className="item-venue">
              <strong>Venue:</strong> {item.location}
            </p>

            <p className="item-date">
              <strong>Reported on:</strong> {item.date}
            </p>

            {
              item.status === 'found' && (
                <div className="item-actions">
            {currentUser ? (
              item.reported_by !== currentUser.id ? (
                <button
                  className="claim-btn"
                  onClick={() => handleClaim(item.id)}
                >
                  Claim Item
                </button>
              ) : null
            ) : (
              <Link to="/login" className="login-to-claim">
                Login to Claim
              </Link>
            )}
          </div>
              ) 
            }

          </div>
        ))}
      </div>
  )
}

export default ItemCard