import React, { useContext } from "react";
import './PlaceOrder.css';
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../utils/cartUtils";

const PlaceOrder = () => {

  const { foodList, foodQuantity, setFoodQuantity } = useContext(StoreContext);

  const cartItems = foodList.filter(food => foodQuantity[food.id] > 0);
  
  const {subTotal, shippingCharge, tax, total} = calculateCartTotals(cartItems, foodQuantity);

  return (

    <div className="placeorder-outer container">

      <main>

        <div className="row g-3">
          {/* Cart Summary */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Order Summary</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-body-secondary">Qty: {foodQuantity[item.id]}</small>
                </div>
                <span className="text-body-secondary">&#8377;{(foodQuantity[item.id]*item.price).toFixed(2)}</span>
              </li>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">&#8377;{subTotal === 0? 0.0 : shippingCharge.toFixed(2)}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Tax</span>
                </div>
                <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
              </li>

              {/* <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li> */}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{(total).toFixed(2)}</strong>
              </li>
            </ul>

            {/* <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code" />
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </form> */}

          </div>




          {/* Billing Form */}
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" required />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" required />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="number" className="form-control" id="phone" placeholder="9876543210" required />
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                </div>
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>India</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>Bihar</option>
                  </select>
                </div>
              </div>

              <hr className="my-4" />


              <button className="w-100 btn btn-primary btn-lg"
              disabled={cartItems.length === 0}
               type="submit">
                Continue to checkout
              </button>

            </form>


          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
