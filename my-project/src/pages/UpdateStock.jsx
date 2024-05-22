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
    category: "" // This will be used to store the CATEGORY_ID
  });

  const [stock, setStock] = useState({
    productName: "",
    quantity: "",
    unitPrice: "",
    volume: ""
  });

  const handleProductInputs = (e) => {
    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev, [name]: value
    }));

    if (name === 'unitPrice') {
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

    setStock(prev => ({
      ...prev, [name]: value
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
    try {
      // Submitting product details
      const productRes = await axios.post('http://localhost:8000/api/products/add', product);
      console.log('Product response:', productRes.data);

      // Submitting stock details
      const stockRes = await axios.post('http://localhost:8000/api/stock/add', stock);
      console.log('Stock response:', stockRes.data);
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
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
          <input type="text" id="productName" name="productName" onChange={handleProductInputs} value={product.productName} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
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
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="volume" className="block text-sm font-medium text-white">Volume</label>
            <DropDown
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="volume"
              options={['1 L', '5 L', '20 L', '210 L']}
              onChange={(e) => handleVolumeChange(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea id="description" name="description" onChange={handleProductInputs} value={product.description} rows="4" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="unitPrice" className="block text-sm font-medium text-white">Unit Price</label>
          <input type="text" id="unitPrice" name="unitPrice" onChange={handleProductInputs} value={product.unitPrice} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-white">Quantity</label>
          <input type="text" id="quantity" name="quantity" onChange={handleStockInputs} value={stock.quantity} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
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
