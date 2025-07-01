import React, { useContext } from "react";
import { assets } from "../../../assets/assets";
import './Header.css';
import { StoreContext } from "../../../context/StoreContext";
import {useNavigate} from "react-router-dom";



const Header = () => {

  const {cartQuantity} = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {

  }


  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <img
            src={assets.skblogo}
            alt="Hotel Logo"
            className="logo-image"
            onClick={()=> navigate('/home')}
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
          
          <div className="position-relative cart-logo-header" onClick={()=> navigate('/cart')}>
            <img src={assets.cart} alt="🛒" height={32} width={32} className="position-relative"  onClick={()=> navigate('/cart')}/>
            <span className="position-absolute top-0 start-100 trnaslate-middle badge rounded-pill bg-warning">{cartQuantity}</span>
          </div>
          <div>
            <button className="btn btn-outline-primary custom-button" onClick={()=> navigate('/login')}>Login</button>
            <button className="btn btn-outline-success custom-button" onClick={()=> navigate('/register')}>Register</button>
          </div>

        </div>
      </div>
    </header>
  );
};
export default Header;
