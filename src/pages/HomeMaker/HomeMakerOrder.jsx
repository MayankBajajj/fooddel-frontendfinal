import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeMakerOrders = ({ homeMakerId }) => {
  const [orders, setOrders] = useState([]);
  const backend = "https://fooddel-backendfinal.onrender.com"; // your backend URL

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backend}/api/order/homemaker/${homeMakerId}`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching homemaker orders:", err);
    }
  };

  // ========================
  // ACCEPT ORDER
  // ========================
  const acceptOrder = async (orderId) => {
    try {
      const res = await axios.post(`${backend}/api/order/accept`, {
        orderId,
        homeMakerId
      });

      if (res.data.success) {
        alert("Order Accepted!");
        fetchOrders(); // refresh UI
      }
    } catch (err) {
      console.error("Error accepting:", err);
    }
  };

  // ========================
  // DECLINE ORDER
  // ========================
  const declineOrder = async (orderId) => {
    try {
      const res = await axios.post(`${backend}/api/order/decline`, {
        orderId,
        homeMakerId
      });

      if (res.data.success) {
        alert("Order Declined!");
        fetchOrders(); // refresh UI
      }
    } catch (err) {
      console.error("Error declining:", err);
    }
  };

  return (
    <div className="hm-orders-container">

      <h2>Pending Orders</h2>
      <div className="orders-section">
        {orders.filter(o => o.status === "pending").length === 0 && (
          <p>No pending orders</p>
        )}

        {orders.filter(o => o.status === "pending").map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order #{order._id.slice(-5)}</h3>

            <p><b>Customer:</b> {order.userId?.name || "Unknown"}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            <h4>Items:</h4>
            <ul>
              {order.foodItems.map((item) => (
                <li key={item.foodId._id}>
                  {item.foodId.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="order-actions">
              <button className="accept-btn" onClick={() => acceptOrder(order._id)}>
                Accept ✔
              </button>

              <button className="decline-btn" onClick={() => declineOrder(order._id)}>
                Decline ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ACCEPTED ORDERS */}
      <h2>Accepted Orders</h2>
      <div className="orders-section">
        {orders.filter(o => o.status === "accepted").length === 0 && (
          <p>No accepted orders yet</p>
        )}

        {orders.filter(o => o.status === "accepted").map((order) => (
          <div key={order._id} className="order-card accepted">
            <h3>Order #{order._id.slice(-5)}</h3>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p>Status: ✔ ACCEPTED</p>
          </div>
        ))}
      </div>

      {/* DECLINED ORDERS */}
      <h2>Declined Orders</h2>
      <div className="orders-section">
        {orders.filter(o => o.status === "declined").length === 0 && (
          <p>No declined orders</p>
        )}

        {orders.filter(o => o.status === "declined").map((order) => (
          <div key={order._id} className="order-card declined">
            <h3>Order #{order._id.slice(-5)}</h3>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p>Status: ✖ DECLINED</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMakerOrders;
