import React, { useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';

const Home = ({ searchTerm }) => {
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

      {/* ✅ Food Display - No category filter */}
      <FoodDisplay category="All" searchTerm={searchTerm} />

      {/* ✅ Enhanced Footer Section */}
      <footer id="contact-us" className="footer-section">
        <div className="footer-content">
          
          {/* Top Section - Main Info */}
          <div className="footer-top">
            <div className="footer-column footer-about">
              <h3 className="footer-logo">🍽️ ThaparEATS</h3>
              <p>Connecting you with delicious homemade food from local home chefs. Fresh, authentic, and delivered to your doorstep.</p>
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="Facebook">📘</a>
                <a href="#" className="social-icon" aria-label="Instagram">📷</a>
                <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                <a href="#" className="social-icon" aria-label="YouTube">📺</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="#food-display">Menu</a></li>
                <li><a href="/homemaker-login">Chef Login</a></li>
                <li><a href="/delivery-login">Delivery Partner</a></li>
              </ul>
            </div>

          

            <div className="footer-column">
              <h4>Contact Info</h4>
              <div className="contact-info-item">
                <span className="info-icon">📧</span>
                <div>
                  <p className="info-label">Email</p>
                  <a href="mailto:support@foodapp.com">ThaparEATSsupport@gmail.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="info-icon">📞</span>
                <div>
                  <p className="info-label">Phone</p>
                  <a href="tel:+919876543210">+91-9560083880</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="info-icon">⏰</span>
                <div>
                  <p className="info-label">Hours</p>
                  <p>Mon - Sun: 9 AM - 11 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="footer-bottom">
            <p>&copy; 2025 ThaparEATS. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
