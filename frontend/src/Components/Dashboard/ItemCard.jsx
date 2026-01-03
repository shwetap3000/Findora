import React from 'react';
import '../../Styles/Dashboard.css';

// items and displayItems are being passed as props from Dashboard.jsx
function ItemCard({items, displayItems}) {
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
          </div>
        ))}
      </div>
  )
}

export default ItemCard