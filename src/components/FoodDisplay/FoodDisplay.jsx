import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category, searchTerm = "" }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>🍽️ Available Dishes</h2>
      <p className="food-display-subtitle">Delicious homemade food, delivered fresh to your doorstep</p>

      <div className="food-display-list">
        {food_list
          .filter((item) => {
            const matchesCategory =
              category === "All" || item.category === category;

            // ✅ Improved search - checks name, description, and category
            const searchLower = searchTerm.toLowerCase().trim();
            const matchesSearch =
              searchTerm.trim() === "" ||
              item.name.toLowerCase().includes(searchLower) ||
              item.description.toLowerCase().includes(searchLower) ||
              item.category.toLowerCase().includes(searchLower);

            return matchesCategory && matchesSearch;
          })
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              homeMakerId={item.homeMakerId}
            />
          ))}
      </div>

      {/* 🚨 Show message when nothing matches search */}
      {food_list.filter(
        (item) => {
          const matchesCategory = category === "All" || item.category === category;
          const searchLower = searchTerm?.toLowerCase().trim() || "";
          const matchesSearch =
            searchTerm.trim() === "" ||
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower);
          return matchesCategory && matchesSearch;
        }
      ).length === 0 && searchTerm.trim() !== "" && (
        <div style={{ textAlign: "center", marginTop: "40px", padding: "20px" }}>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "10px" }}>
            😕 No items found for "{searchTerm}"
          </p>
          <p style={{ fontSize: "0.95rem", color: "#999" }}>
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
