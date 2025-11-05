import React, { useState } from "react";
import "./DeliveryNavbar.css";
import { useNavigate } from "react-router-dom";

const DeliveryNavbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="delivery-navbar">
      <div className="logo-section">
        <h2>
          <span className="highlight">Thapar</span>EATS <span>Partner</span>
        </h2>
      </div>

      <div className="right-controls">
        <button
          className={`status-toggle ${isOnline ? "online" : "offline"}`}
          onClick={() => setIsOnline(!isOnline)}
        >
          <span className="status-dot"></span>
          {isOnline ? "Online" : "Offline"}
        </button>

        <button className="switch-btn" onClick={() => navigate("/")}>
          👤 Switch to User
        </button>

        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default DeliveryNavbar;
