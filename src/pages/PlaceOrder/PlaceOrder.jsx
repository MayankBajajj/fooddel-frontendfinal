import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, token, url, setCartItems } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in before placing order.");
      return;
    }

    // ✅ Find foods present in cart
    const items = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        foodId: item._id,
        quantity: cartItems[item._id],
        homeMakerId: item.homeMakerId, // ✅ attach homemaker ID from food listing
      }));

    if (items.length === 0) {
      alert("Please add something to cart before ordering.");
      return;
    }

    const homeMakerId = items[0].homeMakerId; // ✅ taking homemaker ID from first item

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          items,
          totalAmount: getTotalCartAmount(),
          homeMakerId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("✅ Order Placed Successfully!");
        setCartItems({}); // empty cart
        navigate("/orders"); // redirect to orders page
      } else {
        alert("❌ Order failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="mutli-fields">
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" required />
        </div>
        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" required />
          <input type="text" placeholder="Country" required />
        </div>

        <input type="text" placeholder="Phone" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
