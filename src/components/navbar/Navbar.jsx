import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, setSearchTerm }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const goToDeliveryLogin = () => {
    navigate("/delivery-login");
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenu("contact-us");

    const scrollToSection = () => {
      const section = document.getElementById("contact-us");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 500);
    } else scrollToSection();
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </a>
          </li>

          <li>
            <a
              href="#contact-us"
              onClick={handleContactClick}
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <div className="navbar-right">

          {/* 🔍 Search icon */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="icon search-trigger"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Cart */}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" className="icon" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <button onClick={() => setShowLogin(true)} className="signin-btn">
              Sign In
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">

                {/* ✅ FIXED ORDERS BUTTON */}
                <li onClick={() => navigate("/orders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>

                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

          <button onClick={goToDeliveryLogin} className="signin-btn partner-btn">
            Partner Login
          </button>

          <button
            onClick={() => navigate("/homemaker-login")}
            className="signin-btn partner-btn"
          >
            Home Maker Login
          </button>
        </div>
      </div>

      {/* Search UI */}
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for food..."
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
