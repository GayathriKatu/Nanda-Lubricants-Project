import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './App.css';
import Home from './home';
import Login from './login';
import Register from './register';
import Shop from './shop';
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
import AdminReports from './pages/AdminReports';
import { FaFacebook } from 'react-icons/fa';
import ProductDisplay from './pages/ProductDisplay';
import RetailerDisplay from './pages/RetailerDisplay';


function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id', 'user_type']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        if (cookies.user_id) {
            setIsLoggedIn(true);
            setUserType(cookies.user_type);
        }
    }, [cookies]);

    const renderNavLinks = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <Link to='/' className="nav-link">Home</Link>
                    <Link to='/login' className="nav-link">Login</Link>
                    <Link to='/register' className="nav-link">Register</Link>
                    <Link to='/productdisplay' className="nav-link">Products</Link>

                </>
            );
        } else {
            switch (userType) {
                case 'Retailer':
                    return (
                        <>
                            <Link to='/' className="nav-link">Home</Link>
                            <Link to='/login' className="nav-link">Login</Link>
                            <Link to='/shop' className="nav-link">Shop</Link>
                            {/* <Link to='/register' className="nav-link">Register</Link> */}
                        </>
                    );
                case 'Staff':
                    return (
                        <>
                            <Link to='/' className="nav-link">Home</Link>
                            <Link to='/login' className="nav-link">Login</Link>
                            <Link to='/currentstock' className="nav-link">Current Stock</Link>
                            <Link to='/deliveryschedule' className="nav-link">Delivery Schedule</Link>
                            <Link to='/inquirydisplay' className="nav-link">Inquiries</Link>
                        </>
                    );
                case 'Admin':
                    return (
                        <>
                            <Link to='/' className="nav-link">Home</Link>
                            <Link to='/login' className="nav-link">Login</Link>
                            <Link to='/adminreports' className="nav-link">Reports</Link>
                            <Link to='/currentstock' className="nav-link">Current Stock</Link>
                            <Link to='/staffdetails' className="nav-link">Staff</Link>
                            <Link to='/deliveryschedule' className="nav-link">Delivery Schedule</Link>
                            <Link to='/inquirydisplay' className="nav-link">Inquiries</Link>
                            <Link to='/retailerdisplay' className="nav-link">Retailers</Link>
                            
                        </>
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="ribbon flex justify-between items-center p-2 bg-gray-800 text-white">
                    <div className="logo flex items-center">
                        <img src={logo} alt="Nanda Logo" className="h-10 mr-2" />
                        <div className="company-info">
                            <p>Powered By <br /> Laughs Lubricants</p>
                        </div>
                    </div>
                    <div className="contact-info flex items-center space-x-4 text-xs">
                        <p>+94 371933455</p>
                        <p>nandalubricants@gmail.com</p>
                        <a href="https://www.facebook.com/nandagroup.lk?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </header>
                <nav className="navigation flex justify-end p-2">
                    {renderNavLinks()}
                </nav>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
                    <Route path='/currentstock' element={<CurrentStock />} />
                    <Route path='/deliveryschedule' element={<DeliverySchedule />} />
                    <Route path='/orderpreview' element={<OrderPreview />} />
                    <Route path='/mainshop' element={<MainShop />} />
                    <Route path='/orderpopup' element={<OrderPopup />} />
                    <Route path='/updateinventory' element={<UpdateInventory />} />
                    <Route path='/inquirydisplay' element={<InquiryDisplay />} />
                    <Route path='/staffdetails' element={<StaffDetails />} />
                    <Route path='/updatestaff' element={<UpdateStaff />} />
                    <Route path='/adminreports' element={<AdminReports />} />
                    <Route path='/productdisplay' element={<ProductDisplay />} />
                    <Route path='/retailerdisplay' element={<RetailerDisplay />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
