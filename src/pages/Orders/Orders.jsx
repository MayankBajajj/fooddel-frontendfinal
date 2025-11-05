// src/pages/Orders/Orders.jsx

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContext";

const Orders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://food-del-backend-eg8o.onrender.com/api/order/user-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {orders.length === 0 && <p>No orders placed yet.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <p><b>Order ID:</b> {order._id}</p>
            <p className={`status ${order.status}`}>{order.status.toUpperCase()}</p>
          </div>

          <ul className="order-items">
            {order.foodItems.map((item) => (
              <li key={item.foodId._id}>
                ✅ {item.foodId.name} × {item.quantity}
              </li>
            ))}
          </ul>

          <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
          <p className="timestamp">Placed On: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
