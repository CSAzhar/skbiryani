import React from "react";
import { assets } from "../../../assets/assets";
import './Header.css';


const Header = () => {

    const handleLoginClick = () => {

    }

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <img
            src={assets.logo}
            alt="Hotel Logo"
            className="logo-image"
          />
        </div>

        {/* Hotel Name Section */}
        <div className="header-title">
          <h3 className="hotel-name">SHAHI KITCHEN BIRYANI</h3>
          <p className="hotel-tagline">Luxury Redefined Biryani</p>
        </div>

        {/* Login Icon Section */}
        <div className="header-login" onClick={handleLoginClick}>
          {/* <FaUserCircle className="login-icon" /> */}
          <span className="login-text">Login</span>
        </div>
      </div>
    </header>
  );
};
export default Header;
