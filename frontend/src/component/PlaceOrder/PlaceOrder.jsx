import React, { useContext, useEffect, useState } from "react";
import './PlaceOrder.css';
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../utils/cartUtils";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiServices";
import { RAZORPAY_KEY } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";



const PlaceOrder = () => {

  const { foodList, foodQuantity, getFoodQuantity, token } = useContext(StoreContext);

  const cartItems = foodList.filter(food => foodQuantity[food.id] > 0);

  const { subTotal, shippingCharge, tax, total } = calculateCartTotals(cartItems, foodQuantity);

  const [addressDetail, setAddressDetail] = useState({
    fullName: "",
    phone: "",
    email:"",
    address: "",
    landmark: "",
    area: ""
  });

  const onChangeHandler = ((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddressDetail(addressDetail => ({ ...addressDetail, [name]: value }));
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(addressDetail);
  // });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(addressDetail);
    console.log('cart items details',cartItems)
    const orderData = {
      orderedItems: cartItems.map(item => ({
        foodId: item.id,
        quantity: foodQuantity[item.id],
        price: item.price * foodQuantity[item.id],
        category: item.category.name,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      userAddress: `${addressDetail.fullName} ${addressDetail.phone} ${addressDetail.email} ${addressDetail.address} ${addressDetail.landmark} ${addressDetail.area}`,
      amount: Math.round(total * 100).toFixed(2),
      email: addressDetail.email,
      phoneNumber: addressDetail.phone,
      orderStatus:'Preparing'
    }

    try {
      const response = await ApiService.createOrder(orderData, token);
      if(response.statusCode === 200 && response.razorPayOrderId){
        console.log('Order initiated and created');
        initiateRazorPayPayment(response);
      }
    } catch (error) {
      toast.error('Failed to order TRY again');
    }

  }

  const initiateRazorPayPayment = (order) => {
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "SK Biryani",
        description: "Food order payement",
        order_id: order.razorpayOrderId,
        handler: async function(razorpayResponse) {
          await verifyPayment(razorpayResponse)
        },
        prefill: {
          name: `${addressDetail.fullName}`,
          email: `${addressDetail.email}`,
          contact: `${addressDetail.phone}`,
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: async function(){
            toast.error('Payment cnacelled.');
            await deleteOrder(order.orderId)
          }
        }
      };
      const razorpay = new window.Razorpay(options)
      razorpay.open();
  }

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };

    const response =await ApiService.verifyPaymentOrder(paymentData, token);
    if(response.statusCode === 200){
      toast.success('Payment success');
      const response = await ApiService.clearCart(token);
      if(response.statusCode === 200){
        toast.done('cart cleared');
        await getFoodQuantity();
      }
      navigate('/myorders');
    }else{
      toast.error('Payment failed, Please try again');
      navigate("/");
    }

  }

  const deleteOrder = async (orderId) => {
    try {
      const response = await ApiService.deleteOrder(orderId, token);
      if(response.statusCode === 200){
        toast.success('order deleted');
      }
      else{
        toast.error("order deletion failed");
      }
    } catch (error) {
      toast.error('Error while deleting order');
    }
  }




                  // RETURN AREA NOW

  return (

    <div className="placeorder-outer container mt-4">
      <main>

        <div className="row g-3">
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
                  <span className="text-body-secondary">&#8377;{(foodQuantity[item.id] * item.price).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">&#8377;{subTotal === 0 ? 0.0 : shippingCharge.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Tax</span>
                </div>
                <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
              </li>
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

            <form className="needs-validation" onSubmit={handleOnSubmit}>

              <div className="row g-3">
                <div className="col-sm-12">
                  <label htmlFor="fullName" className="form-label">Full name</label>
                  <input type="text"
                    minLength={3}
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={addressDetail.fullName}
                    required onChange={onChangeHandler} />
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel"
                    maxLength={10}
                    minLength={10}
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={addressDetail.phone}
                    required
                    onChange={onChangeHandler}
                    placeholder="9876543210" />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email (Optional)</label>
                  <input type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={addressDetail.email}
                    onChange={onChangeHandler}
                    placeholder="Enter mail" />
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address Details</label>
                  <input type="text"
                    minLength={10}
                    className="form-control"
                    id="address"
                    name="address"
                    value={addressDetail.address}
                    required
                    onChange={onChangeHandler}
                    placeholder="1234 Main St" />
                </div>
                <div className="col-12">
                  <label htmlFor="landmark" className="form-label">LandMark</label>
                  <input type="text"
                    className="form-control"
                    id="landmark"
                    name="landmark"
                    value={addressDetail.landmark}
                    onChange={onChangeHandler}
                    placeholder="Enter landmark"
                    required />
                </div>
                <div className="col-md-8">
                  <label htmlFor="area" className="form-label">Area</label>
                  <select className="form-select"
                    id="area" name="area"
                    value={addressDetail.area}
                    required
                    onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Airport Panta</option>
                    <option>Rly.Station Panta</option>
                    <option>Kankadbag Panta</option>
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
