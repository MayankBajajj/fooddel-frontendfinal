import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Orders from "./pages/Orders/Orders";


import DeliveryLayout from "./pages/DeliveryPartner/DeliveryLayout";
import DeliveryHome from "./pages/DeliveryPartner/DeliveryHome";
import DeliveryHistory from "./pages/DeliveryPartner/DeliveryHistory";
import DeliveryProfile from "./pages/DeliveryPartner/DeliveryProfile";
import DeliveryEarnings from "./pages/DeliveryPartner/DeliveryEarnings";
import DeliveryLogin from "./pages/DeliveryPartner/DeliveryLogin";

import HomeMakerLogin from "./pages/HomeMaker/HomeMakerLogin";
import HomeMakerDashboard from "./pages/HomeMaker/HomeMakerDashboard";
import AddFood from "./pages/HomeMaker/AddFood";
import Order from "./pages/HomeMaker/Order";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // ✅ Clear search when switching pages
  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

  const isDeliveryLoggedIn =
    localStorage.getItem("isDeliveryLoggedIn") === "true";

  const isHomeMakerLoggedIn =
    localStorage.getItem("isHomeMakerLoggedIn") === "true";

  const shouldHideNavbar =
    location.pathname.startsWith("/delivery") &&
    location.pathname !== "/delivery-login" ||
    (location.pathname.startsWith("/homemaker") &&
    location.pathname !== "/homemaker-login");

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        {!shouldHideNavbar && (
          <Navbar setShowLogin={setShowLogin} setSearchTerm={setSearchTerm} />
        )}

        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />


          {/* ✅ Homemaker Auth Screens */}
          <Route path="/homemaker-login" element={<HomeMakerLogin />} />
          <Route
  path="/homemaker/orders"
  element={isHomeMakerLoggedIn ? <Orders /> : <Navigate to="/homemaker-login" />}
/>

          
          {/* ✅ Protected Dashboard */}
          <Route
            path="/homemaker"
            element={
              isHomeMakerLoggedIn ? (
                <HomeMakerDashboard />
              ) : (
                <Navigate to="/homemaker-login" replace />
              )
            }
          />

          {/* ✅ Protected Add Food */}
          <Route
            path="/homemaker/add-food"
            element={
              isHomeMakerLoggedIn ? (
                <AddFood />
              ) : (
                <Navigate to="/homemaker-login" replace />
              )
            }
          />

          {/* ✅ Delivery Partner auth */}
          <Route path="/delivery-login" element={<DeliveryLogin />} />
            

          <Route
            path="/delivery/*"
            element={
              isDeliveryLoggedIn ? (
                <DeliveryLayout />
              ) : (
                <Navigate to="/delivery-login" replace />
              )
            }
          >
            <Route index element={<DeliveryHome />} />
            <Route path="history" element={<DeliveryHistory />} />
            <Route path="profile" element={<DeliveryProfile />} />
            <Route path="earnings" element={<DeliveryEarnings />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
