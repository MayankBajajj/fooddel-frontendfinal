import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import addIcon from "../../assets/add_icon_white.png";
import removeIcon from "../../assets/remove_icon_red.png";
import starIcon from "../../assets/rating_starts.png";

const FoodItem = ({ id, name, description, price, image, homeMakerId }) => {
  const { url, addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const cartCount = cartItems[id] || 0;

  const BASE_URL = "https://fooddel-backendfinal.onrender.com";

 const imageUrl = `${BASE_URL}/images/${image}`;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={imageUrl} alt={name} className="food-item-image" />

        {cartCount > 0 ? (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={removeIcon} alt="-" />
            <p>{cartCount}</p>
            <img onClick={() => addToCart(id)} src={addIcon} alt="+" />
          </div>
        ) : (
          <img
            onClick={() => addToCart(id)}
            src={addIcon}
            alt="add"
            className="add"
          />
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={starIcon} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>

        {/* ⭐ Show homemaker name if populated */}
        {homeMakerId?.name && (
          <p className="food-maker">
            <strong>{homeMakerId.name}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
