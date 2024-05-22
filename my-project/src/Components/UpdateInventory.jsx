import React, { useState, useEffect } from 'react';

function UpdateInventory({ onClose }) {
  const [productName, setProductName] = useState('');
  const [inStock, setInStock] = useState('');
  const [volume, setVolume] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = () => {
    // Handle form submission logic here
    // For example, you can submit the data to a server
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-white">
        <h2 className="text-2xl font-semibold mb-4 text-white">Update Product Details</h2>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inStock" className="block text-sm font-medium text-white">In-Stock Quantity</label>
          <input
            type="text"
            id="inStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="volume" className="block text-sm font-medium text-white">Volume</label>
          <input
            type="text"
            id="volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateInventory;
