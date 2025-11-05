import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category, searchTerm }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list
          .filter((item) => {
            const matchesCategory =
              category === "All" || item.category === category;

            const matchesSearch =
              searchTerm.trim() === "" ||
              item.name.toLowerCase().startsWith(searchTerm.toLowerCase());

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
            />
          ))}
      </div>

      {/* 🚨 Show message when nothing matches search */}
      {food_list.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          item.name.toLowerCase().startsWith(searchTerm?.toLowerCase())
      ).length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#808080" }}>
          No items found 😕
        </p>
      )}
    </div>
  );
};

export default FoodDisplay;
