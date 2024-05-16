import React, { useState } from 'react';
import BankDetailsPopup from './BankPopup';
import PrimaryButton from './Components/PrimaryButton';


const RegisterPage = () => {
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [route, setRoute] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState({ bankName: '', accountName: '', accountNumber: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // Your registration logic here, including bankDetails if needed
      
      // Clear form fields after successful registration
      setShopName('');
      setAddress('');
      setRoute('');
      setContactNumber('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleBankDetailsSubmit = (data) => {
    setBankDetails(data);
    closePopup();
  };

  return (
    <div className="flex justify-center bg-gray-800">
    
      <div className="w-1/2 mx-4 mt-20">
        <h2 className="mb-4 text-xl text-white">Retailer Details</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="shopName" className="block mb-2 text-white">Shop Name:</label>
            <input
              id="shopName"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-white">Address:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="route" className="block mb-2 text-white">Route:</label>
            <input
              id="route"
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-2 text-white">Contact Number:</label>
            <input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white">Email Address:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <button
            type="button"
            onClick={openPopup}
            className="bg-[#D4C5A9] text-black font-medium py-2 px-4 rounded-md hover:bg-[#b3a081] transition duration-300 mb-8"
          >
            Enter Bank Details
          </button>
          
        </form>
      </div>
      <div className="w-1/2 mx-4 mt-20">
        <h1 className="mb-4 text-xl text-white">Create Account</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-white">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-white">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-white">Re-enter Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
            />
          </div>
          <PrimaryButton text="Register" type="submit" className="w-full" />
        </form>
      </div>
      {isPopupOpen && (
        <BankDetailsPopup
          onClose={closePopup}
          onSubmit={handleBankDetailsSubmit}
        />
      )}
    </div>
  );
};

export default RegisterPage;
