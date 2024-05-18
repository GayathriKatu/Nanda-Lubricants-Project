import React, { useState, useEffect } from 'react';
import PrimaryButton from './Components/PrimaryButton';
import PreviewComponent from './Components/PreviewComponent';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [volume, setVolume] = useState('');

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/productnames");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

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

  const navigate = useNavigate();

  const handleAddOrder = () => {
    // Add order logic here
  };

  const handleSubmitOrder = () => {
    // Submit order logic here
  };

  const tableRows = [
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560', subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560', subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560', subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560', subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560', subtotal: '828000' }
  ];

  return (
    <div className="bg-gray-800 min-h-screen px-24 py-10">
      <div className="flex mb-8">
        <p className="text-3xl text-white font-semibold px-7">ORDER</p>
      </div>
      <div className="container p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow text-white flex flex-col">
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
                {products.map((productName, index) => (
                  <option key={index} value={productName}>
                    {productName}
                  </option>
                ))}
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
            <div className="flex justify-end mt-4">
              <PrimaryButton text="Add" onClick={handleAddOrder} />
            </div>
          </div>
          <div className="bg-transparent">
            <PreviewComponent tableRows={tableRows} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <PrimaryButton text="Place Order" onClick={() => navigate("/orderpopup")} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
