// App.js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './home';
import Login from './login';
import Register from './register';
import Shop from './shop';
import StockUpdate from './stockUpdate';
import logo from './Images/NandaLogo.png';
import CurrentStock from './pages/CurrentStock';
import DeliverySchedule from './pages/DeliverySchedule';
import OrderPreview from './pages/OrderPreview';
import MainShop from './pages/MainShop';
import OrderPopup from './Components/OrderPopup';
import UpdateInventory from './Components/UpdateInventory';





function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="ribbon">
          <div className="logo">
          <img src={logo} alt="Nanda Logo" /></div>
          <div className="company-info">
            <p>Powered By <br></br> Laughs Lubricants</p>
          </div>
        </header>
        <nav className="navigation">
          <Link to='/' className="nav-link">Home</Link>
          <Link to='/register' className="nav-link">Register</Link>
          <Link to='/login' className="nav-link">Login</Link>
          <Link to='/shop' className="nav-link">Shop</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/currentstock' element={<CurrentStock />} />
          <Route path='/deliveryschedule' element={<DeliverySchedule />} />
          <Route path='/orderpreview' element={<OrderPreview />} />
          <Route path='/mainshop' element={<MainShop />} />
          <Route path='/orderpopup' element={<OrderPopup />} />
          <Route path='/updateinventory' element={<UpdateInventory />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
