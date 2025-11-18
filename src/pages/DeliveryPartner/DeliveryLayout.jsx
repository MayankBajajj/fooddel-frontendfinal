import React, { useState } from "react";
import "./DeliveryLayout.css";
import { useNavigate } from "react-router-dom";
import DeliveryHome from "./DeliveryHome";
import DeliveryHistory from "./DeliveryHistory";
import DeliveryEarnings from "./DeliveryEarnings";
import DeliveryProfile from "./DeliveryProfile";

const DeliveryLayout = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const partner = JSON.parse(localStorage.getItem("deliveryPartner"));

  const logout = () => {
    localStorage.removeItem("isDeliveryLoggedIn");
    localStorage.removeItem("deliveryPartner");
    navigate("/delivery-login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "history":
        return <DeliveryHistory />;
      case "earnings":
        return <DeliveryEarnings />;
      case "profile":
        return <DeliveryProfile />;
      default:
        return <DeliveryHome />;
    }
  };

  return (
    <div className="delivery-layout">
      {/* Header */}
      <div className="delivery-header">
        <div className="header-left">
          <h1>🚴‍♂️ Delivery Partner Dashboard</h1>
          <p className="welcome-text">Welcome back, {partner?.name || "Partner"}!</p>
        </div>
        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Body with Sidebar + Content */}
      <div className="delivery-body">
        <div className="delivery-sidebar">
          <h3 className="sidebar-title">📋 Menu</h3>
          <div className="sidebar-menu">
            <button
              className={activeTab === "home" ? "menu-item active" : "menu-item"}
              onClick={() => setActiveTab("home")}
            >
              <span className="menu-icon">🏍️</span>
              <span>Active Orders</span>
            </button>
            <button
              className={activeTab === "history" ? "menu-item active" : "menu-item"}
              onClick={() => setActiveTab("history")}
            >
              <span className="menu-icon">📦</span>
              <span>History</span>
            </button>
            <button
              className={activeTab === "earnings" ? "menu-item active" : "menu-item"}
              onClick={() => setActiveTab("earnings")}
            >
              <span className="menu-icon">💰</span>
              <span>Earnings</span>
            </button>
            <button
              className={activeTab === "profile" ? "menu-item active" : "menu-item"}
              onClick={() => setActiveTab("profile")}
            >
              <span className="menu-icon">👤</span>
              <span>Profile</span>
            </button>
          </div>
        </div>

        <div className="delivery-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DeliveryLayout;
