import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);




const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Add loading state
  const [promoApplied, setPromoApplied] = useState(false);

  // ❗ Must be inside component so it can access state
  const getFinalAmount = () => {
    const subtotal = getTotalCartAmount();
    const delivery = subtotal === 0 ? 0 : 2;
    const discountedSubtotal = promoApplied ? subtotal * 0.5 : subtotal;
    return discountedSubtotal + delivery;
  };

  const url = "https://fooddel-backendfinal.onrender.com"; // backend base URL

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
        
        // Check if homeMakerId exists in food items
        const firstFood = response.data.data[0];
        if (firstFood) {
          console.log("📋 Sample food item:", {
            name: firstFood.name,
            _id: firstFood._id,
            homeMakerId: firstFood.homeMakerId,
            hasHomeMakerId: !!firstFood.homeMakerId
          });
        }
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
      try {
        // Load token first (synchronous)
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
        
        // Then fetch food list
        await fetchFoodList();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false); // ✅ Mark loading complete
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
    setIsLoggedIn,
    isLoading, 
    getFinalAmount,
    promoApplied,
   setPromoApplied
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
