import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 added login state

  const url = "https://food-del-backend-eg8o.onrender.com"; // backend base URL

  // ✅ Add to cart with login check
  const addToCart = (itemId) => {
    if (!isLoggedIn) {
      alert("Please login before adding items to the cart.");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 0) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
      return prev;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
        console.log("✅ Food fetched:", response.data.data);
      } else {
        console.error("Failed to fetch food list:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching food list:", error);
    }
  };

  // ✅ Load data + token on first render
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true); // 👈 mark logged in
      }
    }
    loadData();
  }, []);

  // ✅ Update login state if token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn, // 👈 so other components (like Login/Logout) can update it
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
