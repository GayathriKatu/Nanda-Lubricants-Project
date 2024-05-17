import React, { useState } from 'react';
import PrimaryButton from './Components/PrimaryButton'; 

function Shop() {

  

  const [userID, setUserID] = useState('');
  const [shopName, setShopName] = useState('');
  const [route, setRoute] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [volume, setVolume] = useState('');

  const volumeOptions = [
    '100 ml',
    '200 ml',
    '500 ml',
    '1 liter',
    '2 liters',
    '5 liters'
  ];

  const categoryOptions = [
    'Diesel',
    'Petrol',
    'Motor Cycle',
    'Three Wheeler',
    'Car',
    'Truck',
    'Bus'
  ];

  const handleAddOrder = () => {
    // Add order logic here
  };

  const handleSubmitOrder = () => {
    // Submit order logic here
  };

  return (
    <div className="bg-gray-800 min-h-screen px-24 py-10">
      <div className="flex mb-8">
        <p className="text-3xl text-white font-semibold px-7">ORDER</p>
      </div>
      <div className="container mx-auto p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-transparent">
            <h2 className="text-xl text-white font-semibold mb-12 mt-2">Retailer Details</h2>
            <input
              type="text"
              placeholder="User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow text-white flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label>Product:</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
              >
                <option value="">Select Product</option>
                {/* Add product options here */}
              </select>
              <label>Quantity:</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
              />
              <label>Volume:</label>
              <select
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-4"
              >
                <option value="">Select Volume</option>
                {volumeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <PrimaryButton text="Add" onClick={handleAddOrder} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <PrimaryButton text="Place Order" onClick={handleSubmitOrder} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
