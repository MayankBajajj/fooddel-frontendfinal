import React from "react";
import "./Delivery.css";

const DeliveryHistory = () => {
  const history = [
    {
      id: 98,
      date: "Oct 25, 2025",
      customer: "Aditi Mehta",
      pickup: "ThaparEATS Kitchen",
      delivery: "Hostel J-Block",
      earnings: "₹45",
    },
    {
      id: 99,
      date: "Oct 26, 2025",
      customer: "Rohit Khanna",
      pickup: "ThaparEATS Kitchen",
      delivery: "Hostel C-Block",
      earnings: "₹50",
    },
    {
      id: 100,
      date: "Oct 27, 2025",
      customer: "Sanya Kapoor",
      pickup: "ThaparEATS Kitchen",
      delivery: "Hostel F-Block",
      earnings: "₹55",
    },
  ];

  return (
    <div className="delivery-history">
      <h2>📦 Delivery History</h2>
      <p>Here you can view your completed deliveries and earnings summary.</p>

      <table className="history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Pickup</th>
            <th>Delivery</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>#{item.id}</td>
              <td>{item.date}</td>
              <td>{item.customer}</td>
              <td>{item.pickup}</td>
              <td>{item.delivery}</td>
              <td>{item.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryHistory;
