import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeMakerDashboard.css";
import { useNavigate } from "react-router-dom";

const HomeMakerDashboard = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  const homemaker = JSON.parse(localStorage.getItem("homeMaker"));

  /** ✅ Fetch foods added by this homemaker */
  const fetchFoods = async () => {
    if (!homemaker?._id) return;

    const response = await axios.get(
      `https://food-del-backend-eg8o.onrender.com/api/food/list?homeMakerId=${homemaker._id}`
    );

    if (response.data.success) {
      setFoods(response.data.data);
    }
  };

  /** ✅ Fetch orders assigned to homemaker */
  const fetchOrders = async () => {
    const response = await axios.get(
      `https://food-del-backend-eg8o.onrender.com/api/order/homemaker/${homemaker._id}`
    );

    if (response.data.success) {
      setOrders(response.data.data);
    }
  };

  /** ✅ Accept / Reject Order */
  const updateStatus = async (orderId, status) => {
    await axios.post("https://food-del-backend-eg8o.onrender.com/api/order/update-status", {
      orderId,
      status,
    });

    fetchOrders(); // refresh UI
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Remove this food?")) return;

    const response = await axios.post("https://food-del-backend-eg8o.onrender.com/api/food/remove", {
      id,
    });

    if (response.data.success) {
      alert("Food deleted ✅");
      fetchFoods();
    } else {
      alert("Failed to delete ❌");
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchOrders();
  }, []);

  return (
    <div className="hm-dashboard">
      <h2>HomeMaker Dashboard</h2>

      <div className="top-buttons">
        <button className="add-btn" onClick={() => navigate("/homemaker/add-food")}>
          ➕ Add Food
        </button>
      </div>

      {/* ✅ ORDERS SECTION */}
      <h3>📦 Orders Received</h3>
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Status:</b> {order.status}</p>

          <ul>
            {order.foodItems.map((food) => (
              <li key={food.foodId._id}>
                {food.foodId.name} × {food.quantity}
              </li>
            ))}
          </ul>

          {/* Buttons only for pending */}
          {order.status === "placed" && (
            <>
              <button
                className="accept-btn"
                onClick={() => updateStatus(order._id, "accepted")}
              >
                ✅ Accept
              </button>
              <button
                className="reject-btn"
                onClick={() => updateStatus(order._id, "rejected")}
              >
                ❌ Reject
              </button>
            </>
          )}

          {order.status === "accepted" && <p className="accepted-text">✅ Accepted</p>}
          {order.status === "rejected" && <p className="rejected-text">❌ Rejected</p>}
        </div>
      ))}

      {/* ✅ FOODS SECTION */}
      <h3>🍽 Your Foods</h3>

      <table className="hm-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Food Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {foods.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={`https://food-del-backend-eg8o.onrender.com/images/${item.image}`}
                  alt={item.name}
                  className="hm-food-thumb"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteFood(item._id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {foods.length === 0 && <p>No foods added yet.</p>}
    </div>
  );
};

export default HomeMakerDashboard;
