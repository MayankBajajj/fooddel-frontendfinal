import React, { useState } from "react";
import "./Delivery.css";

const DeliveryHistory = () => {
  const [history] = useState([
    {
      id: 98,
      date: "Nov 8, 2025",
      time: "2:30 PM",
      customer: "Aditi Mehta",
      items: ["Chole Bhature"],
      pickup: "ThaparEATS Kitchen, Block A",
      delivery: "Hostel J-Block, Room 301",
      earnings: "₹45",
      distance: "1.5 km",
    },
    {
      id: 99,
      date: "Nov 9, 2025",
      time: "1:15 PM",
      customer: "Rohit Khanna",
      items: ["Veg Thali", "Lassi"],
      pickup: "ThaparEATS Kitchen, Block B",
      delivery: "Hostel C-Block, Room 102",
      earnings: "₹50",
      distance: "0.9 km",
    },
    {
      id: 100,
      date: "Nov 10, 2025",
      time: "7:45 PM",
      customer: "Sanya Kapoor",
      items: ["Pasta", "Garlic Bread"],
      pickup: "ThaparEATS Kitchen, Block A",
      delivery: "Hostel F-Block, Room 205",
      earnings: "₹55",
      distance: "1.8 km",
    },
  ]);

  const totalEarnings = history.reduce((sum, item) => sum + parseInt(item.earnings.replace('₹', '')), 0);

  return (
    <div className="delivery-history">
      {/* Summary Card */}
      <div className="history-summary">
        <div className="summary-item">
          <div className="summary-icon">📦</div>
          <div>
            <h3>{history.length}</h3>
            <p>Total Deliveries</p>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">💵</div>
          <div>
            <h3>₹{totalEarnings}</h3>
            <p>Total Earned</p>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">⭐</div>
          <div>
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="section-container-delivery">
        <div className="section-header-delivery">
          <h2>📦 Delivery History</h2>
          <span className="history-count">{history.length} completed</span>
        </div>

        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-header">
                <div>
                  <span className="history-order-id">Order #{item.id}</span>
                  <span className="history-date">📅 {item.date} • {item.time}</span>
                </div>
                <span className="history-earnings">{item.earnings}</span>
              </div>

              <div className="history-details">
                <div className="history-row">
                  <span className="history-label">👤 Customer:</span>
                  <span>{item.customer}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">🍽️ Items:</span>
                  <span>{item.items.join(", ")}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">📍 From:</span>
                  <span>{item.pickup}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">🏠 To:</span>
                  <span>{item.delivery}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">📏 Distance:</span>
                  <span>{item.distance}</span>
                </div>
              </div>

              <div className="history-status">
                <span className="completed-badge">✅ Delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
