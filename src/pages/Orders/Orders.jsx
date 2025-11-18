// src/pages/Orders/Orders.jsx 

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContext";

const Orders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        "https://fooddel-backendfinal.onrender.com/api/order/user-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userid: user.id,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = (status) => {
    switch (status) {
      case "placed":
        return "⏳ Waiting for homemaker to accept";
      case "accepted":
        return "✅ Order accepted! Preparing your food";
      case "rejected":
        return "❌ Order rejected by homemaker";
      case "prepared":
        return "👨‍🍳 Your food is being prepared";
      case "completed":
        return "🍽️ Food ready for delivery";
      case "delivered":
        return "✅ Order delivered successfully";
      default:
        return status;
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>📦 Your Orders</h1>
        <button className="refresh-btn" onClick={fetchOrders} disabled={isLoading}>
          {isLoading ? "⏳" : "🔄"} Refresh
        </button>
      </div>

      {isLoading && orders.length === 0 ? (
        <div className="loading-state">
          <p>⏳ Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <p className="empty-icon">🛒</p>
          <h3>No Orders Yet</h3>
          <p>Start ordering delicious food from our home chefs!</p>
          <button className="browse-btn" onClick={() => (window.location.href = "/")}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className={`order-card ${order.status}`} key={order._id}>
              <div className="order-card-header">
                <div className="order-id-section">
                  <span className="order-label">Order ID</span>
                  <span className="order-id">
                    #{order._id?.slice(-8)?.toUpperCase()}
                  </span>
                </div>
                <span className={`order-badge badge-${order.status}`}>
                  {order.status?.toUpperCase()}
                </span>
              </div>

              <div className="status-message">
                <p>{getStatusMessage(order.status)}</p>
              </div>

              <div className="order-items-section">
                <h4>📋 Items Ordered:</h4>
                
                <ul className="order-items-list">
                  {(order.foodItems || []).map((item, idx) => (
                    <li key={idx}>
                      <span className="item-name">
                        🍽️ {item?.foodId?.name || "Unknown Item"}
                      </span>
                      <span className="item-quantity">× {item?.quantity || 1}</span>
                    </li>
                  ))}
                </ul>
                <p className="homemaker-name">
  👨‍🍳 From: { order.homeMakerId?.name}
</p>

              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-amount">₹{order.totalAmount}</span>

                  {order.paymentMethod && (
                    <span className="payment-method-badge">
                      {order.paymentMethod === "Cash on Delivery" ? "💵 COD" : "💳 Online"}
                    </span>
                  )}
                </div>

                <div className="order-date">
                  <span>
                    🕒{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {order.status === "rejected" && (
                <div className="rejection-notice">
                  ⚠️ This order was cancelled by the homemaker. No charges applied.
                </div>
              )}

              {order.status === "accepted" && (
                <div className="acceptance-notice">
                  🎉 Great! Your food is being prepared. You'll receive it soon!
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="auto-refresh-note">
        <p>🔄 Orders refresh automatically every 10 seconds</p>
      </div>
    </div>
  );
};

export default Orders;
