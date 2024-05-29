import React, { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import DropDown from '../Components/DropDown';
import axios from 'axios';

function UpdateStock({ onClose }) {
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    description: "",
    unitPrice: "",
    category: "" 
  });

  const [stock, setStock] = useState({
    productName: "",
    quantity: "",
    unitPrice: "",
    volume: ""
  });

  const [errors, setErrors] = useState({
    productId: "",
    productName: "",
    description: "",
    unitPrice: "",
    category: "",
    quantity: "",
    volume: ""
  });

  const handleProductInputs = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === 'description' && value.length > 200) {
      errorMessage = "Description should not exceed 200 characters.";
    } else if (name === 'unitPrice' && (!/^\d+$/.test(value) || parseInt(value, 10) < 0)) {
      errorMessage = "Unit Price should be a non-negative integer.";
    }

    setProduct(prev => ({
      ...prev, [name]: value
    }));

    setErrors(prev => ({
      ...prev, [name]: errorMessage
    }));

    if (name === 'unitPrice' && errorMessage === "") {
      setStock(prev => ({
        ...prev, unitPrice: value
      }));
    }

    if (name === 'productName') {
      setStock(prev => ({
        ...prev, productName: value
      }));
    }
  };

  const handleStockInputs = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === 'quantity' && (!/^\d+$/.test(value) || parseInt(value, 10) < 0)) {
      errorMessage = "Quantity should be a non-negative integer.";
    }

    setStock(prev => ({
      ...prev, [name]: value
    }));

    setErrors(prev => ({
      ...prev, [name]: errorMessage
    }));
  };

  const handleVolumeChange = (value) => {
    setStock(prev => ({
      ...prev, volume: value
    }));
  };

  const handleCategoryChange = (value) => {
    setProduct(prev => ({
      ...prev, category: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any existing errors before submission
    for (let key in errors) {
      if (errors[key]) {
        alert("Please correct the errors before submitting.");
        return;
      }
    }

    try {
      // Submitting product details
      const productRes = await axios.post('http://localhost:8000/api/products/add', product);
      console.log('Product response:', productRes.data);

    } catch (err) {
      console.log('Error:', err.response ? err.response.data : err.message);
    } 
    try {
      // Submitting stock details
      const stockRes = await axios.post('http://localhost:8000/api/stock/add', stock);
      console.log('Stock response:', stockRes.data);
      console.log(stock);
    } catch (err) {
      console.log('Error:', err.response ? err.response.data : err.message);

    } finally {
      onClose();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-white overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-white">Update Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-white">Product ID</label>
          <input type="text" id="productId" value={product.productId} name="productId" onChange={handleProductInputs} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.productId && <span className="text-red-500 text-sm">{errors.productId}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
          <input type="text" id="productName" name="productName" onChange={handleProductInputs} value={product.productName} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.productName && <span className="text-red-500 text-sm">{errors.productName}</span>}
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mr-2">
            <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
            <DropDown
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="category"
              options={['PC', 'DC', 'TWC']}
              onChange={(e) => handleCategoryChange(e.target.value)}
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="volume" className="block text-sm font-medium text-white">Volume</label>
            <DropDown
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="volume"
              options={['1 L', '5 L', '20 L', '210 L']}
              onChange={(e) => handleVolumeChange(e.target.value)}
            />
            {errors.volume && <span className="text-red-500 text-sm">{errors.volume}</span>}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea id="description" name="description" onChange={handleProductInputs} value={product.description} rows="4" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="unitPrice" className="block text-sm font-medium text-white">Unit Price</label>
          <input type="text" id="unitPrice" name="unitPrice" onChange={handleProductInputs} value={product.unitPrice} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.unitPrice && <span className="text-red-500 text-sm">{errors.unitPrice}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-white">Quantity</label>
          <input type="text" id="quantity" name="quantity" onChange={handleStockInputs} value={stock.quantity} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}
        </div>
        <div className="flex justify-between">
          <PrimaryButton text="Add" onClick={handleSubmit}/>
          <PrimaryButton text="Cancel" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default UpdateStock;
