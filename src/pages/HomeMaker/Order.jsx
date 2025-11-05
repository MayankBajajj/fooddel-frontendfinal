import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const Orders = () => {
  const homemaker = JSON.parse(localStorage.getItem("homeMaker"));
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(
      `https://food-del-backend-eg8o.onrender.com/api/order/list/${homemaker._id}`
    );
    if (response.data.success) {
      setOrders(response.data.data);
    }
  };

  const updateStatus = async (orderId, status) => {
    await axios.post("https://food-del-backend-eg8o.onrender.com/api/order/update-status", {
      orderId,
      status,
    });
    fetchOrders(); // Refresh list
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-section">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order #{order._id.slice(-5)}</h3>

            <p><strong>Total:</strong> ₹{order.totalAmount}</p>

            <p><strong>Status:</strong> {order.status}</p>

            {order.foodItems.map((item) => (
              <p key={item._id}>
                🍽 {item.foodId.name} × {item.quantity}
              </p>
            ))}

            <div className="order-actions">
              {order.status === "placed" && (
                <>
                  <button onClick={() => updateStatus(order._id, "accepted")}>
                    ✅ Accept
                  </button>
                  <button onClick={() => updateStatus(order._id, "rejected")}>
                    ❌ Reject
                  </button>
                </>
              )}

              {order.status === "accepted" && (
                <button onClick={() => updateStatus(order._id, "prepared")}>
                  🍳 Mark as Prepared
                </button>
              )}

              {order.status === "prepared" && (
                <button onClick={() => updateStatus(order._id, "completed")}>
                  ✅ Complete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
