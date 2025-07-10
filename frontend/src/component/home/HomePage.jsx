import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./HomePage.css";
import logo from "./icon.jpg";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const HomePage = () => {
  const [selectedType, setSelectedType] = useState("All");

  const { foodQuantity,
          category,
          increaseFoodQuantity, 
          decreseFoodQuantity,
          foodList
                      } = useContext(StoreContext);

  const cartItems = foodList.filter(food => foodQuantity[food.id] > 0);

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const types = [
    "All",
    ...new Set(foodList.map((item) => item.category.name)),
  ];

  const filteredItems =
    selectedType === "All"
      ? foodList
      : foodList.filter((item) => item.category.name === selectedType);


  const handleAddToCart = (item) => {
    toast.success(`${item.name} added to cart!`);
  };

  useEffect(() => {
    scrollToSection();
  }, []);

  return (
    <div className="home-container">

      <div className="filtered-section" >

        <div className="category-selection">
          <div>
            <h2 className="cat-selec-text">What are you craving for?</h2>
          </div>

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

        <hr></hr>
        


        <div className="category-items" >

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
                  <p className="card-verlay-f-p1">{item.name}</p>
                  {/* <p>|</p> */}
                  <p className="card-verlay-f-p2">{item.description}</p>
                </div>

                <div className="card-overlay-s">
                  <div className="card-overlay-s-f-div">
                    <p className="card-verlay-s-f-p1">&#8377;{item.price}</p>
                    <p className="card-verlay-s-f-p2">per unit*</p>
                  </div>
                  <div>|</div>
                  <div>
                    {!item.isAvailable ? (
                      <p className="not-available">Not Available</p>
                    ) : (


                      foodQuantity[item.id] > 0 ? (
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-danger btn-sm" onClick={() => decreseFoodQuantity(item.id)}>
                            <i className="bi bi-dash-circle"></i>
                          </button>
                          <span className="fw-bold">{foodQuantity[item.id]}</span>
                          <button className="btn-success btn-sm" onClick={() => increaseFoodQuantity(item.id)}>
                            <i className="bi bi-plus-circle"></i>
                          </button>
                        </div>
                      ) : (
                        <button className="btn-primary btn-sm" onClick={() => increaseFoodQuantity(item.id)}>
                          <i className="bi bi-plus-circle"></i>
                        </button>
                      )


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
          {foodList.map((item) => (
            <div
              key={item.id}
              className="custom-food-card"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
            >
              <div className="card-overlay">
                <div className="card-overlay-f">
                  <p className="card-verlay-f-p1">{item.name}</p>
                  {/* <p>|</p> */}
                  <p className="card-verlay-f-p2">{item.description}</p>
                </div>

                <div className="card-overlay-s">
                  <div className="card-overlay-s-f-div">
                    <p className="card-verlay-s-f-p1">&#8377;{item.price}</p>
                    <p className="card-verlay-s-f-p2">per unit*</p>
                  </div>
                  <div>|</div>
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




      <div className="float-meanu">
        <div>
          <h4>Menu</h4>
        </div>
        <div>
          <button className="coupon-btn">Coupon & Offers</button>
        </div>

        <Link to="/cart">
          <div className="position-relative">
            <img src={assets.cart} alt="🛒" height={32} width={32} className="position-relative" />
            <span className="position-absolute top-0 start-100 trnaslate-middle badge rounded-pill bg-warning">{cartItems.length}</span>
          </div>
        </Link>

        {/* <Link to="/cart" className="partone">
          <div className="cart-div-in-f-m">
            <p className="card-div-p">🛒 Cart: {cartQuantity}</p>
          </div>
        </Link> */}
      </div>


    </div>
  );
};

export default HomePage;
