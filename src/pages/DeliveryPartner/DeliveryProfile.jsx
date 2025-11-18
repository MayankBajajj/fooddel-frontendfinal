import React, { useState } from "react";
import "./Delivery.css";

const DeliveryProfile = () => {
  const partner = JSON.parse(localStorage.getItem("deliveryPartner"));
  
  const [profile] = useState({
    name: partner?.name || "Rishabh",
    id: "DP1025",
    phone: "+91 98765 12345",
    email: partner?.email || "arjun@example.com",
    vehicle: "Hero Splendor",
    vehicleNumber: "PB65-AB-4032",
    joined: "July 2024",
    rating: 4.8,
    totalDeliveries: 56,
    onTimeRate: "98%",
  });

  return (
    <div className="delivery-profile">
      {/* Profile Card */}
      <div className="profile-main-card">
        <div className="profile-avatar">
          <div className="avatar-circle">👤</div>
          <div className="avatar-info">
            <h2>{profile.name}</h2>
            <p className="partner-id">Partner ID: {profile.id}</p>
            <div className="rating-display">
              <span className="rating-stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-value">{profile.rating}/5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="section-container-delivery">
        <div className="section-header-delivery">
          <h2>📋 Personal Information</h2>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <span className="detail-icon">📧</span>
            <div>
              <p className="detail-label">Email</p>
              <p className="detail-value">{profile.email}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <span className="detail-icon">📞</span>
            <div>
              <p className="detail-label">Phone</p>
              <p className="detail-value">{profile.phone}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <span className="detail-icon">🏍️</span>
            <div>
              <p className="detail-label">Vehicle</p>
              <p className="detail-value">{profile.vehicle}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <span className="detail-icon">🔢</span>
            <div>
              <p className="detail-label">Vehicle Number</p>
              <p className="detail-value">{profile.vehicleNumber}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <span className="detail-icon">📅</span>
            <div>
              <p className="detail-label">Joined</p>
              <p className="detail-value">{profile.joined}</p>
            </div>
          </div>

          <div className="profile-detail-item">
            <span className="detail-icon">✅</span>
            <div>
              <p className="detail-label">On-Time Rate</p>
              <p className="detail-value">{profile.onTimeRate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="section-container-delivery">
        <div className="section-header-delivery">
          <h2>📊 Performance Stats</h2>
        </div>

        <div className="performance-stats">
          <div className="performance-item">
            <div className="perf-circle">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#28a745" strokeWidth="10" 
                        strokeDasharray="314" strokeDashoffset="31.4" 
                        transform="rotate(-90 60 60)" />
              </svg>
              <div className="perf-value">98%</div>
            </div>
            <p className="perf-label">On-Time Delivery</p>
          </div>

          <div className="performance-item">
            <div className="perf-circle">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#667eea" strokeWidth="10" 
                        strokeDasharray="314" strokeDashoffset="62.8" 
                        transform="rotate(-90 60 60)" />
              </svg>
              <div className="perf-value">80%</div>
            </div>
            <p className="perf-label">Acceptance Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfile;
