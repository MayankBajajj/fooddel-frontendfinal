import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import { useNavigate } from "react-router-dom";

const Home = ({ searchTerm }) => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const handlePartnerClick = () => {
    const confirmSwitch = window.confirm("Switch to Delivery Partner Dashboard?");
    if (confirmSwitch) navigate("/delivery");
  };

  // ✅ Auto-scroll to food list when searchTerm changes
  useEffect(() => {
    if (searchTerm?.length > 0) {
      const section = document.getElementById("food-display");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchTerm]);

  return (
    <div className="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* ✅ Pass the searchTerm to filter results */}
      <FoodDisplay category={category} searchTerm={searchTerm} />

      {/* ✅ Contact Section */}
      <div id="contact-us" className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: support@foodapp.com</p>
        <p>Phone: +91-9876543210</p>
      </div>

      {/* Optional Delivery Partner section */}
      {/* <div className="partner-toggle">
        <h3>Are you a delivery partner?</h3>
        <button onClick={handlePartnerClick} className="partner-btn">
          🚴‍♂️ Go to Partner Dashboard
        </button>
      </div> */}
    </div>
  );
};

export default Home;
