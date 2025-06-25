import React, { useContext } from "react";
import './Cart.css';
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const {foodList,
            cartQuantity,
            foodQuantity,
            decreseFoodQuantity,
            increaseFoodQuantity
     } = useContext(StoreContext);
    const cartItems = foodList.filter(food => foodQuantity[food.id] > 0);
    const subTotal = cartItems.reduce((acc, food) => acc + food.price * foodQuantity[food.id], 0);
    const shippingCharge = subTotal === 0 ? 0 : 10;
    const tax = subTotal * 0.05;
    const total = subTotal + shippingCharge + tax;

    const navigate = useNavigate();
    


    return (

        <div className="container py-5">
            <h2 className="mb-3">Your Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    {/* <!-- Cart Items --> */}
                    {
                        cartItems.length === 0 ? (
                            <p>Your Cart is Enpty</p>
                        ) : (
                            <div className="card mb-4">
                                <div className="card-body">
                                    {cartItems.map((food) => (
                                        <div key={food.id} className="row cart-item mb-1">
                                        <div className="col-md-3">
                                            <img src={food.imageUrl}  height={100} width={100} alt={food.name} className="rounded" />
                                        </div>

                                        <div className="col-md-5">
                                            <h5 className="card-title">{food.name}</h5>
                                            <p className="text-muted">Category: {food.category.name}</p>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <button className="btn btn-outline-secondary btn-sm" 
                                                onClick={() => decreseFoodQuantity(food.id)}
                                                type="button">-</button>
                                                <input style={{ "maxWidth": "100px" }} type="text" className="form-control  form-control-sm text-center quantity-input" value={foodQuantity[food.id]} />
                                                <button className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => increaseFoodQuantity(food.id)}
                                                 type="button">+</button>
                                            </div>
                                        </div>

                                        <div className="col-md-2 text-end">
                                            <p className="fw-bold">&#8377;{food.price}</p>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash" ></i>
                                            </button>
                                        </div>
                                        <hr className="cart-hr"></hr>
                                    </div>
                                    ))}
                                    
                                </div>
                            </div>
                        )
                    }
                    {/* <!-- Continue Shopping Button --> */}
                    <div className="text-start mb-4">
                        <Link to="/home" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">
                    {/* <!-- Cart Summary --> */}
                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>&#8377;{subTotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>&#8377;{shippingCharge}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>&#8377;{tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>&#8377;{total}</strong>
                            </div>
                            <button className="btn btn-primary w-100" 
                                    onClick={() => navigate('/place-order')}
                                    disabled={cartItems.length===0}
                                    >Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    {/* <!-- Promo Code --> */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Apply Promo Code</h5>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter promo code" />
                                <button className="btn btn-outline-secondary" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart;