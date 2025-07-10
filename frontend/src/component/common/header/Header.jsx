import React, { useContext } from "react";
import { assets } from "../../../assets/assets";
import './Header.css';
import { StoreContext } from "../../../context/StoreContext";
import {useNavigate} from "react-router-dom";



const Header = () => {

  const {token, setToken, foodList, foodQuantity, setFoodQuantity} = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    setToken("");
    setFoodQuantity({});
    navigate('/');
  }
  const cartItems = foodList.filter(food => foodQuantity[food.id] > 0);
  


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
          {/* <p className="hotel-tagline">Luxury Redefined Biryani</p> */}
        </div>

        {/* Login Icon Section */}
        <div className="header-login" onClick={()=> navigate('/cart')}>
          {/* <FaUserCircle className="login-icon" /> */}
          
          <div className="position-relative cart-logo-header">
            <img src={assets.cart} alt="🛒" height={32} width={32} className="position-relative"/>
            <span className="position-absolute top-0 start-100 trnaslate-middle badge rounded-pill bg-warning">{cartItems.length}</span>
          </div>
          

        </div>

        {
          !token ? (
            <div>
              <button className="btn btn-outline-primary custom-button" onClick={()=> navigate('/login')}>Login</button>
              <button className="btn btn-outline-success custom-button" onClick={()=> navigate('/register')}>Register</button>
            </div>
          ):(
            <div className="dropdown text-end">
              <a href="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={assets.profile} alt="" width={32} height={32} className="rounded-circle"/>
              </a>
              <ul className="dropdown-menu text-small">
                <li className="dropdown-item" onClick={() => navigate('/myorders')}>Orders</li>
                <li className="dropdown-item"  onClick={handleLogOutClick}>Logout</li>
              </ul>
            </div>
          )
        }

      </div>
    </header>
  );
};
export default Header;
