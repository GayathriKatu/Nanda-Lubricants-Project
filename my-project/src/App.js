// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
import PrivateRoute from './shared/PrivateRoute';
import UpdateInventory from './Components/UpdateInventory';
import InquiryDisplay from './pages/InquiryDisplay';
import StaffDetails from './pages/StaffDetails';
import UpdateStaff from './Components/UpdateStaff';

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (cookies.user_id) {
            setIsLoggedIn(true);
        }
    }, [cookies]);

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
                    {!isLoggedIn && <Link to='/login' className="nav-link">Login</Link>}
                    <Link to='/shop' className="nav-link">Shop</Link>
                </nav>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/shop" element={<PrivateRoute element={<Shop/>} />} />
                    <Route path='/currentstock' element={<CurrentStock />} />
                    <Route path='/deliveryschedule' element={<DeliverySchedule />} />
                    <Route path='/orderpreview' element={<OrderPreview />} />
                    <Route path='/mainshop' element={<MainShop />} />
                    <Route path='/orderpopup' element={<OrderPopup />} />
                    <Route path='/updateinventory' element={<UpdateInventory />} />
                    <Route path='/inquirydisplay' element={<InquiryDisplay />} />
                    <Route path='/staffdetails' element={<StaffDetails />} />
                    <Route path='/updatestaff' element={<UpdateStaff />} />
                    

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;