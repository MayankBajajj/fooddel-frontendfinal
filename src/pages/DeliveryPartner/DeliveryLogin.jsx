import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeliveryLogin.css";

const DeliveryLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://food-del-backend-eg8o.onrender.com/api/delivery/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save login status and user
        localStorage.setItem("isDeliveryLoggedIn", "true");
        localStorage.setItem("deliveryPartner", JSON.stringify(data.partner));

        // ✅ Redirect to dashboard
        navigate("/delivery");
      } else {
        setError("Invalid credentials. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="delivery-login-page">
      <form className="delivery-login-box" onSubmit={handleLogin}>
        <h2>Delivery Partner Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default DeliveryLogin;
