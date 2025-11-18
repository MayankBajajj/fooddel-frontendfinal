import React, { useState, useEffect } from "react";
import "./Delivery.css";

const DeliveryHome = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Riya Sharma",
      items: ["Paneer Tikka", "Dal Makhani"],
      pickup: "ThaparEATS Kitchen, Block A",
      delivery: "Hostel H-Block, Room 204",
      amount: "₹250",
      status: "assigned",
      distance: "1.2 km",
      time: "15 mins ago",
    },
    {
      id: 102,
      customer: "Arjun Patel",
      items: ["Chicken Biryani", "Raita"],
      pickup: "ThaparEATS Kitchen, Block B",
      delivery: "Hostel A-Block, Room 105",
      amount: "₹320",
      status: "picked-up",
      distance: "0.8 km",
      time: "5 mins ago",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const activeCount = orders.filter(o => o.status !== "delivered").length;
  const pickedUpCount = orders.filter(o => o.status === "picked-up").length;

  return (
    <div className="delivery-home">
      {/* Stats Cards */}
      <div className="delivery-stats">
        <div className="stat-card-delivery">
          <div className="stat-icon-delivery">🏍️</div>
          <div className="stat-content-delivery">
            <h3>{activeCount}</h3>
            <p>Active Deliveries</p>
          </div>
        </div>
        <div className="stat-card-delivery">
          <div className="stat-icon-delivery">📦</div>
          <div className="stat-content-delivery">
            <h3>{pickedUpCount}</h3>
            <p>Picked Up</p>
          </div>
        </div>
        <div className="stat-card-delivery">
          <div className="stat-icon-delivery">✅</div>
          <div className="stat-content-delivery">
            <h3>12</h3>
            <p>Today's Deliveries</p>
          </div>
        </div>
        <div className="stat-card-delivery">
          <div className="stat-icon-delivery">💵</div>
          <div className="stat-content-delivery">
            <h3>₹540</h3>
            <p>Today's Earnings</p>
          </div>
        </div>
      </div>

      {/* Active Orders Section */}
      <div className="section-container-delivery">
        <div className="section-header-delivery">
          <h2>🏍️ Active Orders</h2>
          <span className="refresh-text">Auto-refresh every 30s</span>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state-delivery">
            <p className="empty-icon">🚴‍♂️</p>
            <h3>No Active Orders</h3>
            <p>New delivery requests will appear here</p>
          </div>
        ) : (
          <div className="delivery-orders-grid">
            {orders.map((order) => (
              <div key={order.id} className={`delivery-order-card status-${order.status}`}>
                <div className="order-card-header-delivery">
                  <div>
                    <span className="order-label-delivery">Order ID</span>
                    <span className="order-id-delivery">#{order.id}</span>
                  </div>
                  <span className={`status-badge-delivery badge-${order.status}`}>
                    {order.status === "assigned" ? "🟡 Assigned" : 
                     order.status === "picked-up" ? "🟢 Picked Up" : 
                     "✅ Delivered"}
                  </span>
                </div>

                <div className="order-details-delivery">
                  <div className="detail-row">
                    <span className="detail-label">👤 Customer:</span>
                    <span className="detail-value">{order.customer}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">🍽️ Items:</span>
                    <span className="detail-value">{order.items.join(", ")}</span>
                  </div>

                  <div className="location-section">
                    <div className="location-item">
                      <span className="location-icon pickup">📍</span>
                      <div>
                        <p className="location-label">Pickup</p>
                        <p className="location-address">{order.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="location-arrow">→</div>
                    
                    <div className="location-item">
                      <span className="location-icon delivery">🏠</span>
                      <div>
                        <p className="location-label">Drop</p>
                        <p className="location-address">{order.delivery}</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-meta">
                    <span className="meta-item">💰 {order.amount}</span>
                    <span className="meta-item">📏 {order.distance}</span>
                    <span className="meta-item">🕒 {order.time}</span>
                  </div>
                </div>

                <div className="order-actions-delivery">
                  {order.status === "assigned" && (
                    <button
                      className="btn-pickup"
                      onClick={() => handleStatusChange(order.id, "picked-up")}
                    >
                      📦 Mark Picked Up
                    </button>
                  )}
                  {order.status === "picked-up" && (
                    <button
                      className="btn-delivered"
                      onClick={() => handleStatusChange(order.id, "delivered")}
                    >
                      ✅ Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryHome;
