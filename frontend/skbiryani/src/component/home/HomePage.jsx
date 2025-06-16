import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiServices";



const HomePage = () => {

  // const [selectedType, setSelectedType] = useState("All");
  // const types = ["All", "Biryani", "Sweets"];

  // const filteredItems =
  //   selectedType === "All"
  //     ? foodItems
  //     : foodItems.filter((item) => item.type === selectedType);

  const [cartItems, setCartItems] = useState(0);

  const handleAddToCart = () => {
    // setCartItems(cartItems + 1);
  };

  const [foodItems, setFoodItems] = useState([]);

    const fetchList = async() => {
        const response = await ApiService.getAllFood();
        if(response){
          setFoodItems(response);
            // console.log(response);
        }else{
            toast.error('Error while loading foods');
        }
    }

    useEffect( () => {
      fetchList();
  }, [] )

  return (
    <div className="food-menu-container">
      {/* <div className="food-buttons">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div> */}

      <div className="food-cards">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="food-card"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="overlay">
              <h4>{item.name}</h4>
              <p>{item.type}</p>
              <div className="food-actions">
                <button onClick={() => alert(item.details)}>Details</button>
                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="offer-cart-outer">
        <div className="offer-cart">
          {/* Left Section: Coupon */}
          <div className="left-section">
            <button className="coupon-btn">Show Coupons</button>
          </div>

          {/* Right Section: Cart */}
          <div className="right-section">
            <h3>🛒 Cart Items: {cartItems}</h3>
          </div>
        </div>
      </div>

    </div>
  );
};
export default HomePage;
