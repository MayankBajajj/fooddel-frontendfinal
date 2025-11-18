import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, setSearchTerm }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Local state for input

  const { getTotalCartAmount, token, setToken, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Clear user data too
    setToken("");
    
    // Clear cart items
    setCartItems({});
    
    // Navigate to home
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
            <div 
              className="navbar-profile"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <img src={assets.profile_icon} alt="Profile" />
              <ul 
                className={`nav-profile-dropdown ${showProfileDropdown ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ✅ FIXED ORDERS BUTTON */}
                <li onClick={() => {
                  navigate("/orders");
                  setShowProfileDropdown(false);
                }}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>

                <hr />
                <li onClick={() => {
                  logout();
                  setShowProfileDropdown(false);
                }}>
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
          <div className="search-input-container">
            <img src={assets.search_icon} alt="Search" className="search-input-icon" />
            <input
              type="text"
              placeholder="Type food name and click Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // Search on Enter key
                  setSearchTerm(searchInput);
                  const foodSection = document.getElementById('food-display');
                  if (foodSection) {
                    foodSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              autoFocus
              className="search-input-field"
            />
            
            {/* Search button */}
            <button 
              className="search-submit-btn"
              onClick={() => {
                setSearchTerm(searchInput);
                const foodSection = document.getElementById('food-display');
                if (foodSection) {
                  foodSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Search"
            >
              Search
            </button>
            
            {/* Close button */}
            <button 
              className="search-close-btn"
              onClick={() => {
                setShowSearch(false);
                setSearchTerm('');
                setSearchInput('');
              }}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
