import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import HomePage from './component/home/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/home" element={<HomePage />}/>
            </Routes>
          </div>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
