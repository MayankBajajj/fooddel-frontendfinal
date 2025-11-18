import React from "react";
import "./Delivery.css";

const DeliveryEarnings = () => {
  const earningsData = {
    totalDeliveries: 56,
    totalEarnings: "2,450",
    avgPerDelivery: "44",
    weeklyBonus: "250",
    todayEarnings: "540",
    thisMonth: "2,450",
  };

  const recentPayouts = [
    { date: "Nov 7, 2025", amount: "₹850", status: "Paid" },
    { date: "Oct 31, 2025", amount: "₹920", status: "Paid" },
    { date: "Oct 24, 2025", amount: "₹680", status: "Paid" },
  ];

  return (
    <div className="delivery-earnings">
      {/* Earnings Overview Cards */}
      <div className="earnings-overview">
        <div className="earnings-card highlight">
          <div className="earnings-icon">💵</div>
          <div className="earnings-content">
            <h3>₹{earningsData.totalEarnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
        <div className="earnings-card">
          <div className="earnings-icon">📦</div>
          <div className="earnings-content">
            <h3>{earningsData.totalDeliveries}</h3>
            <p>Total Deliveries</p>
          </div>
        </div>
        <div className="earnings-card">
          <div className="earnings-icon">📊</div>
          <div className="earnings-content">
            <h3>₹{earningsData.avgPerDelivery}</h3>
            <p>Avg per Delivery</p>
          </div>
        </div>
        <div className="earnings-card">
          <div className="earnings-icon">🎁</div>
          <div className="earnings-content">
            <h3>₹{earningsData.weeklyBonus}</h3>
            <p>Weekly Bonus</p>
          </div>
        </div>
      </div>

      {/* This Month Stats */}
      <div className="earnings-stats">
        <div className="stat-box">
          <h4>Today</h4>
          <p className="stat-value">₹{earningsData.todayEarnings}</p>
        </div>
        <div className="stat-box">
          <h4>This Month</h4>
          <p className="stat-value">₹{earningsData.thisMonth}</p>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="section-container-delivery">
        <div className="section-header-delivery">
          <h2>💳 Recent Payouts</h2>
        </div>

        <div className="payouts-list">
          {recentPayouts.map((payout, index) => (
            <div key={index} className="payout-card">
              <div className="payout-info">
                <span className="payout-icon">💰</span>
                <div>
                  <p className="payout-amount">{payout.amount}</p>
                  <p className="payout-date">{payout.date}</p>
                </div>
              </div>
              <span className="payout-status">{payout.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
