import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DeliverySidebar.css";

const DeliverySidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { path: "/delivery", label: "Active Orders", icon: "🚴‍♂️" },
    { path: "/delivery/history", label: "History", icon: "📦" },
    { path: "/delivery/earnings", label: "Earnings", icon: "💰" },
    { path: "/delivery/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="delivery-sidebar">
      <h2 className="sidebar-title">Partner Panel</h2>
      <ul className="sidebar-menu">
        {links.map(({ path, label, icon }) => (
          <li key={path} className={pathname === path ? "active" : ""}>
            <Link to={path}>
              <span className="sidebar-icon">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliverySidebar;
