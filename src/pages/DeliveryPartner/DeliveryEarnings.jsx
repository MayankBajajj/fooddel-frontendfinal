import React from "react";
import "./Delivery.css";

const DeliveryEarnings = () => {
  const earningsData = {
    totalDeliveries: 56,
    totalEarnings: "₹2,450",
    avgPerDelivery: "₹44",
    weeklyBonus: "₹250",
  };

  return (
    <div className="delivery-earnings">
      <h2>💰 Earnings Overview</h2>
      <p>Track your total deliveries, payouts, and bonuses.</p>

      <div className="earnings-cards">
        <div className="earning-card">
          <h3>Total Deliveries</h3>
          <p>{earningsData.totalDeliveries}</p>
        </div>
        <div className="earning-card">
          <h3>Total Earnings</h3>
          <p>{earningsData.totalEarnings}</p>
        </div>
        <div className="earning-card">
          <h3>Average / Delivery</h3>
          <p>{earningsData.avgPerDelivery}</p>
        </div>
        <div className="earning-card">
          <h3>Weekly Bonus</h3>
          <p>{earningsData.weeklyBonus}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
