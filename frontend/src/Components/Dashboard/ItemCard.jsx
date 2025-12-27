import React from 'react';
import '../../Styles/Dashboard.css';

function ItemCard({items, displayItems}) {
  return (
    <div className="items-wrapper">
        {displayItems.map((item) => (
          <div className="dashboard-item-card" key={item.id}>
            <div className="item-header">
              <h3 className="item-title">{item.title}</h3>
              <span className={`item-status ${item.status}`}>
                {item.status.toUpperCase()}
              </span>
            </div>

            <p className="item-venue">
              <strong>Venue:</strong> {item.venue}
            </p>

            <p className="item-date">
              <strong>Reported on:</strong> {item.reported_at}
            </p>
          </div>
        ))}
      </div>
  )
}

export default ItemCard