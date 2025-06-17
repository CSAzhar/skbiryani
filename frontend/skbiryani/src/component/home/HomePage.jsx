import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiServices";
import "./HomePage.css";
import logo from "./icon.jpg";

const HomePage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [cartItems, setCartItems] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [category, setCategory] = useState([]);

  const types = [
    "All",
    ...new Set(foodItems.map((item) => item.category.name)),
  ];

  const filteredItems =
    selectedType === "All"
      ? foodItems
      : foodItems.filter((item) => item.category.name === selectedType);

  const fetchList = async () => {
    const response = await ApiService.getAllFood();
    if (response) {
      setFoodItems(response);
    } else {
      toast.error("Error while loading foods");
    }
  };

  const fetchCategory = async () => {
    const response = await ApiService.getAllCategory();
    if (response) {
      setCategory(response);
    } else {
      toast.error("Error while loading foods");
    }
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => prev + 1);
    toast.success(`${item.name} added to cart!`);
  };

  useEffect(() => {
    fetchList();
    fetchCategory();
  }, []);

  return (
    <div className="home-container">

      <div className="filtered-section">

        <div className="category-selection">
          <h2 className="cat-selec-text">What are you craving for?</h2>
          <div className="category-buttons">
            {["All", ...category.map((cat) => cat.name)].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`category-button ${selectedType === type ? "active-category" : ""
                  }`}
                style={{
                  backgroundImage: `url(${type === "All"
                    ? logo // fallback image for "All"
                    : category.find((c) => c.name === type)?.imageUrl || logo
                    })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff",
                  textShadow: "0 0 5px rgba(0,0,0,0.7)",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>


        {/* <div className="category-items">
          <h2>{selectedType === "All" ? "All Items" : selectedType}</h2>
          <div className="items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="food-card">
                <img src={item.imageUrl} alt={item.name} />
                <div className="food-info">
                  <h3>{item.name}</h3>
                  <p>Type: {item.category.name}</p>
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="category-items">

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="custom-food-card"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
            >
              <div className="card-overlay">
                <div className="card-overlay-f">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="card-overlay-s">
                  <div>
                    <h3>&#8377;{item.price}</h3>
                  </div>
                  <div>
                    {!item.isAvailable ? (
                      <p className="not-available">Not Available</p>
                    ) : (
                      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>





      </div>


      <div className="all-items-section">
        <h2>All Menu Items</h2>
        <div className="all-items-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="food-card">
              <img src={item.imageUrl} alt={item.name} />
              <div className="food-info">
                <h3>{item.name}</h3>
                <p>Type: {item.type}</p>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="cart-section">

        <div>
          <h4>Menu</h4>
        </div>
        <div>
          <button className="coupon-btn">Apply Coupon</button>
        </div>
        <div>
          <h3>🛒 Cart Items: {cartItems}</h3>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
