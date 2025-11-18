import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, token, url, setCartItems, getFinalAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in before placing order.");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.phone) {
      alert("Please fill all required fields.");
      return;
    }

    const items = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        foodId: item._id,
        quantity: cartItems[item._id],
        homeMakerId: item.homeMakerId,
      }));

    if (items.length === 0) {
      alert("Please add something to cart before ordering.");
      return;
    }

    const homeMakerId = items[0].homeMakerId;

    if (!homeMakerId) {
      alert("❌ Error: Food item missing homemaker info.");
      return;
    }

    // ❗ getFinalAmount already includes delivery fee
    const totalAmount = getFinalAmount();

    setIsProcessing(true);

    // ======================
    // CASH ON DELIVERY
    // ======================
    if (paymentMethod === "cod") {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          alert("Session expired. Login again.");
          navigate("/");
          return;
        }

        const response = await axios.post(
          `${url}/api/order/place`,
          {
            userId: user.id,
            foodItems: items,
            totalAmount,
            homeMakerId,
            deliveryInfo: {
              ...formData,
              city: "Patiala",
              state: "Punjab",
              zipCode: "147004",
              country: "India",
            },
            paymentId: `COD_${Date.now()}`,
            paymentMethod: "Cash on Delivery",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          alert("Order placed! Pay ₹" + totalAmount + " on delivery.");
          setCartItems({});
          navigate("/orders");
        } else {
          alert("Order failed.");
        }
      } catch (err) {
        alert("Error placing order.");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // ======================
    // DEMO ONLINE PAYMENT
    // ======================
    setTimeout(async () => {
      const confirmPayment = window.confirm(
        `💳 DEMO PAYMENT\n\nPay ₹${totalAmount}\n\nClick OK to simulate payment success.`
      );

      if (!confirmPayment) {
        setIsProcessing(false);
        return;
      }

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          alert("Session expired.");
          navigate("/");
          return;
        }

        const response = await axios.post(
          `${url}/api/order/place`,
          {
            userId: user.id,
            foodItems: items,
            totalAmount,
            homeMakerId,
            deliveryInfo: {
              ...formData,
              city: "Patiala",
              state: "Punjab",
              zipCode: "147004",
              country: "India",
            },
            paymentId: `DEMO_PAY_${Date.now()}`,
            paymentMethod: "Demo Mode",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          alert("Payment Successful! Order Placed.");
          setCartItems({});
          navigate("/orders");
        } else {
          alert("Order failed.");
        }
      } catch (err) {
        alert("Error placing order.");
      } finally {
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="mutli-fields">
          <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} required />
        </div>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} required />

        <p className="location-note">📍 Delivery Location (Fixed)</p>

        <div className="multi-fields">
          <input type="text" value="Patiala" disabled className="readonly-field" />
          <input type="text" value="Punjab" disabled className="readonly-field" />
        </div>

        <div className="multi-fields">
          <input type="text" value="147004" disabled className="readonly-field" />
          <input type="text" value="India" disabled className="readonly-field" />
        </div>

        <input type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleInputChange} maxLength="10" pattern="[0-9]{10}" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getFinalAmount() - 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getFinalAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getFinalAmount() === 0 ? 0 : getFinalAmount()}</b>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-method-selection">
            <h3>Select Payment Method</h3>

            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "online" ? "selected" : ""}`}>
                <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === "online"} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div className="option-content">
                  <span className="option-icon">💳</span>
                  <div>
                    <p className="option-title">Online Payment</p>
                    <p className="option-desc">UPI, Cards, Wallets (Demo)</p>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div className="option-content">
                  <span className="option-icon">💵</span>
                  <div>
                    <p className="option-title">Cash on Delivery</p>
                    <p className="option-desc">Pay when you receive</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" disabled={isProcessing || getTotalCartAmount() === 0} className={isProcessing ? "processing" : ""}>
            {isProcessing ? "⏳ Processing..." : paymentMethod === "cod" ? "📦 PLACE ORDER (COD)" : "💳 PROCEED TO PAYMENT"}
          </button>

          <div className="payment-info">
            {paymentMethod === "online" ? (
              <>
                <p className="demo-badge">🧪 DEMO MODE</p>
                <p className="payment-note">Click payment button to simulate checkout.</p>
              </>
            ) : (
              <>
                <p className="cod-badge">💵 Cash on Delivery Selected</p>
                <p className="payment-note">Pay ₹{getFinalAmount()} in cash when your food arrives.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
