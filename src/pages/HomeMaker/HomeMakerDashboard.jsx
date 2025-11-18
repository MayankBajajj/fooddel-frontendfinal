import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeMakerDashboard.css";
import { useNavigate } from "react-router-dom";

const HomeMakerDashboard = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  const homemaker = JSON.parse(localStorage.getItem("homeMaker"));

  // Fetch foods by homemaker ID
  const fetchFoods = async () => {
    try {
      const res = await axios.get(
        `https://fooddel-backendfinal.onrender.com/api/food/list/homemaker?homeMakerId=${homemaker._id}`
      );
      if (res.data.success) setFoods(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch orders by homemaker ID
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://fooddel-backendfinal.onrender.com/api/order/homemaker/${homemaker._id}`
      );
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (orderId, status) => {
    await axios.post("https://fooddel-backendfinal.onrender.com/api/order/update-status", {
      orderId,
      status,
    });
    fetchOrders();
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Remove this food?")) return;

    const res = await axios.post("https://fooddel-backendfinal.onrender.com/api/food/remove", {
      id,
    });

    if (res.data.success) fetchFoods();
  };

  useEffect(() => {
    fetchFoods();
    fetchOrders();
  }, []);

  const logout = () => {
    localStorage.removeItem("isHomeMakerLoggedIn");
    localStorage.removeItem("homeMaker");
    navigate("/homemaker-login");
  };

  return (
    <div className="hm-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>👨‍🍳 HomeMaker Dashboard</h1>
          <p className="welcome-text">Welcome back, {homemaker.name}!</p>
        </div>

        <div className="header-actions">
          <button className="add-food-btn" onClick={() => navigate("/homemaker/add-food")}>
            ➕ Add New Food
          </button>
          <button className="logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3>{foods.length}</h3>
            <p>Total Foods</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{orders.filter(o => o.status === "placed").length}</h3>
            <p>Pending Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{orders.filter(o => o.status === "accepted").length}</h3>
            <p>Accepted</p>
          </div>
        </div>
      </div>

      {/* ORDERS SECTION */}
      <div className="section-container">
        <div className="section-header">
          <h2>📦 Recent Orders</h2>
          <span className="order-count">{orders.length} total</span>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>📭 No orders yet</p>
            <span>Orders will appear here when customers place them</span>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span className={`order-status status-${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.foodItems.map((f, i) => (
                      <li key={i}>
                        <span className="item-name">{f.foodId?.name}</span>
                        <span className="item-qty">× {f.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {order.deliveryInfo && (
                  <div className="order-customer-info">
                    <p><strong>📞 Phone:</strong> {order.deliveryInfo.phone}</p>
                    <p><strong>📍 Address:</strong> {order.deliveryInfo.street}, Patiala</p>
                  </div>
                )}

                <div className="order-actions">
                  {order.status === "placed" ? (
                    <>
                      <button
                        className="btn-accept"
                        onClick={() => updateStatus(order._id, "accepted")}
                      >
                        ✓ Accept
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => updateStatus(order._id, "rejected")}
                      >
                        ✕ Reject
                      </button>
                    </>
                  ) : (
                    <div className="order-status-display">
                      <span className={`status-text ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOODS SECTION */}
      <div className="section-container">
        <div className="section-header">
          <h2>🍽️ Your Food Menu</h2>
          <span className="food-count">{foods.length} items</span>
        </div>

        {foods.length === 0 ? (
          <div className="empty-state">
            <p>🍴 No food items yet</p>
            <span>Add your first food item</span>
            <button
              className="btn-add-first"
              onClick={() => navigate("/homemaker/add-food")}
            >
              Add Food Item
            </button>
          </div>
        ) : (
          <div className="foods-grid">
            {foods.map(item => (
              <div key={item._id} className="food-card">
                <div className="food-image-container">
                  <img
  src={
    item.image.startsWith("/images/")
      ? `https://fooddel-backendfinal.onrender.com${item.image}`
      : item.image.startsWith("images/")
      ? `https://fooddel-backendfinal.onrender.com/${item.image}`
      : item.image.startsWith("http")
      ? item.image
      : `https://fooddel-backendfinal.onrender.com/images/${item.image}`
  }
  alt={item.name}
  className="food-image"
/>

                  <span className="food-category">{item.category}</span>
                </div>

                <div className="food-details">
                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-price">₹{item.price}</p>

                  <button className="btn-delete" onClick={() => deleteFood(item._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeMakerDashboard;
