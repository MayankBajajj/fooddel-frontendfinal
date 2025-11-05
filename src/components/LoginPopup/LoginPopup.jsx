import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const data =
        currState === "Login"
          ? { email, password }
          : { name, email, password };

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        setShowLogin(false);
      } else {
        setMessage(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Server error.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowLogin(false)}
          >
            ✖
          </button>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          {currState}
        </button>

        {message && <p style={{ color: "green" }}>{message}</p>}

        <p className="toggle-text">
          {currState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign up here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
