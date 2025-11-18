import React from 'react'
import './Header.css'

const Header = () => {
  const scrollToMenu = () => {
    const foodDisplay = document.getElementById('food-display');
    if (foodDisplay) {
      foodDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring delectable dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and serve you delicious meals, anytime!</p>
        <button className="ok" onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
