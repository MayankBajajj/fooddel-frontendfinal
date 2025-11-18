import React, { useState } from "react";
import "./HomeMakerLogin.css";
import { useNavigate } from "react-router-dom";

const HomeMakerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://fooddel-backendfinal.onrender.com/api/homemaker/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("✅ LOGIN RESPONSE:", data);

      if (data.success && data.homemaker) {
        // ✅ store in localStorage
        localStorage.setItem("isHomeMakerLoggedIn", "true");
        localStorage.setItem("homeMaker", JSON.stringify(data.homemaker));

        alert("✅ Login Successful");

        navigate("/homemaker"); // ⬅ through protected route
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="home-maker-login-container">
      <form className="home-maker-login-box" onSubmit={handleLogin}>
        <h2>Home Maker Login</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default HomeMakerLogin;
