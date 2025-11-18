import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    promoApplied,
    setPromoApplied
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const VALID_PROMO = "BILLA";

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;

  const total = promoApplied ? subtotal * 0.5 + deliveryFee : subtotal + deliveryFee;

  const isCartEmpty = subtotal === 0;

  const applyPromo = () => {
    if (promoCode === VALID_PROMO) {
      setPromoApplied(true); // ✅ GLOBAL promo state
      alert("🎉 Promo code applied! 50% discount added.");
    } else {
      alert("❌ Invalid Promo Code");
    }
  };

  const handleCheckout = () => {
    if (isCartEmpty) {
      alert("⚠️ Your cart is empty! Add items before checkout.");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="ok" key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{promoApplied ? subtotal * 0.5 : subtotal}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{total}</b>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCartEmpty}
            className={isCartEmpty ? "checkout-btn-disabled" : "checkout-btn-active"}
          >
            {isCartEmpty ? "🛒 CART IS EMPTY" : "✓ PROCEED TO CHECKOUT"}
          </button>

          {isCartEmpty && (
            <p className="empty-cart-message">
              Add some delicious food items to your cart to continue!
            </p>
          )}
        </div>

        {/* PROMO CODE SECTION */}
        <div className="cart-promocode">
          <div>
            <p className="promocode">If you have a promocode, enter it here</p>

            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromo}>Submit</button>
            </div>

            {promoApplied && (
              <p style={{ color: "green", marginTop: "8px" }}>
                ✔ 50% Promo Applied
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
