import React from "react";
import "./Delivery.css";

const DeliveryProfile = () => {
  const profile = {
    name: "Arjun Singh",
    id: "DP1025",
    phone: "+91 98765 12345",
    vehicle: "Hero Splendor (PB65-AB-4032)",
    joined: "July 2024",
    rating: 4.8,
  };

  return (
    <div className="delivery-profile">
      <h2>👤 Partner Profile</h2>
      <p>Your profile details and account information.</p>

      <div className="profile-card">
        <h3>{profile.name}</h3>
        <p><strong>Partner ID:</strong> {profile.id}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Vehicle:</strong> {profile.vehicle}</p>
        <p><strong>Joined:</strong> {profile.joined}</p>
        <p><strong>Rating:</strong> ⭐ {profile.rating}</p>
      </div>
    </div>
  );
};

export default DeliveryProfile;
