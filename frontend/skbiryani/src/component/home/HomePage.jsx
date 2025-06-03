import { useState } from "react";

const foodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    type: "Biryani",
    imageUrl:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    price: 250,
    details: "Spicy and flavorful chicken biryani cooked with aromatic spices.",
  },
  {
    id: 2,
    name: "Mutton Biryani",
    type: "Biryani",
    imageUrl: "https://images.pexels.com/photos/16020573/pexels-photo-16020573.jpeg?cs=srgb&dl=pexels-gourav-sarkar-462560178-16020573.jpg&fm=jpg",
    price: 300,
    details: "Tender mutton cooked with basmati rice and rich spices.",
  },
  {
    id: 3,
    name: "Gulab Jamun",
    type: "Sweets",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLroXOalaL5F7n-8Qrx6Tu44ksoKYA9kbqxA&s",
    price: 100,
    details: "Soft milk-solid-based sweet balls soaked in sugar syrup.",
  },
  {
    id: 4,
    name: "Rasgulla",
    type: "Sweets",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLroXOalaL5F7n-8Qrx6Tu44ksoKYA9kbqxA&s",
    price: 90,
    details: "Spongy and juicy cottage cheese balls in sugar syrup.",
  },
  {
    id: 5,
    name: "Paneer Biryani",
    type: "Biryani",
    imageUrl: "https://example.com/images/paneer-biryani.jpg",
    price: 220,
    details: "Delicious biryani with cubes of paneer and fragrant spices.",
  },
  {
    id: 6,
    name: "Chicken Biryani",
    type: "Biryani",
    imageUrl: "https://example.com/images/chicken-biryani.jpg",
    price: 250,
    details: "Spicy and flavorful chicken biryani cooked with aromatic spices.",
  },
  {
    id: 7,
    name: "Mutton Biryani",
    type: "Biryani",
    imageUrl: "https://images.pexels.com/photos/16020573/pexels-photo-16020573.jpeg?cs=srgb&dl=pexels-gourav-sarkar-462560178-16020573.jpg&fm=jpg",
    price: 300,
    details: "Tender mutton cooked with basmati rice and rich spices.",
  },
  {
    id: 8,
    name: "Gulab Jamun",
    type: "Sweets",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLroXOalaL5F7n-8Qrx6Tu44ksoKYA9kbqxA&s",
    price: 100,
    details: "Soft milk-solid-based sweet balls soaked in sugar syrup.",
  },
  {
    id: 9,
    name: "Rasgulla",
    type: "Sweets",
    imageUrl: "https://example.com/images/rasgulla.jpg",
    price: 90,
    details: "Spongy and juicy cottage cheese balls in sugar syrup.",
  },
  {
    id: 10,
    name: "Paneer Biryani",
    type: "Biryani",
    imageUrl: "https://example.com/images/paneer-biryani.jpg",
    price: 220,
    details: "Delicious biryani with cubes of paneer and fragrant spices.",
  },
];

const HomePage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const types = ["All", "Biryani", "Sweets"];

  const filteredItems =
    selectedType === "All"
      ? foodItems
      : foodItems.filter((item) => item.type === selectedType);

  const [cartItems, setCartItems] = useState(0);

  const handleAddToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="food-menu-container">
      <div className="food-buttons">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="food-cards">
        {filteredItems.map((item) => (
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
