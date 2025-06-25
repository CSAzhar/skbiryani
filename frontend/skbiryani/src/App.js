
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
            </Routes>
          </div>
          <Footer />
        </div>

      </StoreContextProvider>

    </BrowserRouter>
  );
}

export default App;
