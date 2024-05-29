import React, { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';

function Inquiry({ onClose }) {
  const [inquiry, setInquiry] = useState({
    userName: "",
    shopName: "",
    orderId: "",
    contactNumber: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case 'userName':
        if (!/^[a-zA-Z_]+$/.test(value)) {
          error = "Username should contain only letters and underscores";
        }
        break;
      case 'orderId':
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
          error = "Order ID should be a non-negative integer";
        }
        break;
      case 'contactNumber':
        if (!/^\d{7}$/.test(value)) {
          error = "Contact number should be a non-negative integer with 7 characters";
        }
        break;
      case 'description':
        if (value.length > 200) {
          error = "Inquiry description should be less than 200 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInquiry(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validate = () => {
    const newErrors = {};

    for (const [name, value] of Object.entries(inquiry)) {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/inquiry/add', inquiry);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
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
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={handleInputs}
            value={inquiry.userName}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.userName && <p className="text-red-500">{errors.userName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="shopName" className="block text-sm font-medium text-white">Shop Name</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            onChange={handleInputs}
            value={inquiry.shopName}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-sm font-medium text-white">Order ID</label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            onChange={handleInputs}
            value={inquiry.orderId}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.orderId && <p className="text-red-500">{errors.orderId}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-white">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            onChange={handleInputs}
            value={inquiry.contactNumber}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Inquiry</label>
          <textarea
            id="description"
            name="description"
            rows="6"
            onChange={handleInputs}
            value={inquiry.description}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="flex justify-end">
          <PrimaryButton text="Send Inquiry" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default Inquiry;
