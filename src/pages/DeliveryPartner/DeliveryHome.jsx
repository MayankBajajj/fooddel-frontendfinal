import React, { useState } from "react";
import "./Delivery.css";
import DeliveryNavbar from "../../components/Navbar/DeliveryNavbar";

const DeliveryHome = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Riya Sharma",
      pickup: "ThaparEATS Kitchen",
      delivery: "Hostel H-Block",
      status: "Assigned",
    },
    {
      id: 102,
      customer: "Arjun Patel",
      pickup: "ThaparEATS Kitchen",
      delivery: "Hostel A-Block",
      status: "Picked Up",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <DeliveryNavbar />
      <div className="delivery-home">
        <div className="delivery-welcome">
          <h3>👋 Hey Arjun, ready to deliver smiles today?</h3>
          <p>Keep your app online to receive new delivery requests.</p>
        </div>

        <div className="delivery-dashboard">
          <h2>🚴‍♂️ Delivery Partner Dashboard</h2>
          <p>Welcome back! Here are your active delivery assignments:</p>
        </div>

        <div className="delivery-orders">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p><b>Customer:</b> {order.customer}</p>
              <p><b>Pickup:</b> {order.pickup}</p>
              <p><b>Delivery:</b> {order.delivery}</p>
              <p>
                <b>Status:</b>{" "}
                <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </span>
              </p>

              <div className="order-actions">
                {order.status === "Assigned" && (
                  <button className="btn-orange" onClick={() => handleStatusChange(order.id, "Picked Up")}>
                    Mark Picked Up
                  </button>
                )}
                {order.status === "Picked Up" && (
                  <button className="btn-green" onClick={() => handleStatusChange(order.id, "Delivered")}>
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeliveryHome;
