
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/home/HomePage';
import Header from './component/common/header/Header';
import Footer from './component/common/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/" element={<HomePage />}/>
            </Routes>
          </div>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
