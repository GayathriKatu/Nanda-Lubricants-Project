// Inquiry.js
import React, { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';

function Inquiry({ onClose }) {

  const [inquiry, setInquiry] = useState({
    orderId: "",
    description: ""
  });

  const handleinputs = (e) => {
    setInquiry(pre => ({
      ...pre,
      [e.target.name]: e.target.value
    }));
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inquiry.orderId);
    try {
      const res = await axios.post('http://localhost:8000/api/inquiry/add', inquiry);
      console.log(res.data);
      
    } catch (err) {
      console.log(err.response.data);
      console.log('hi');
    } finally {
      onClose();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-white">
      <h2 className="text-2xl font-semibold mb-4 text-white">Place an Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-white">User Name</label>
          <input type="text" id="userName" name="userName" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="shopName" className="block text-sm font-medium text-white">Shop Name</label>
          <input type="text" id="shopName" name="shopName" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-sm font-medium text-white">Order ID</label>
          <input type="text" id="orderId" name="orderId" onChange={handleinputs} value={inquiry.orderId} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-white">Contact Number</label>
          <input type="text" id="contactNumber" name="contactNumber" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Inquiry</label>
          <textarea id="description" name="description" rows="6" onChange={handleinputs} value={inquiry.description} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="flex justify-end">
          <PrimaryButton text="Send Inquiry" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default Inquiry;
