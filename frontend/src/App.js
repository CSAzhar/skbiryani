
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/home/HomePage';
import Header from './component/common/header/Header';
import Footer from './component/common/footer/Footer';
import Cart from './component/cart/Cart';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StoreContextProvider } from './context/StoreContext';
import PlaceOrder from './component/PlaceOrder/PlaceOrder';
import LoginPage from './component/auth/login/LoginPage';
import Register from './component/auth/register/Register';
import { ToastContainer } from 'react-toastify';
import MyOrders from './component/myorders/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <StoreContextProvider>
        
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
            <ToastContainer />
          </div>
          <Footer />
        </div>

      </StoreContextProvider>

    </BrowserRouter>
  );
}

export default App;
