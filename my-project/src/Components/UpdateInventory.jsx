import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from './PrimaryButton'; // Ensure you import the PrimaryButton component
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateInventory() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cardContent } = location.state || {};
  const [product, setProduct] = useState({
    productName: cardContent?.product || '',
    quantity: '', // Initialize as empty string
    volume: cardContent?.volume || '',
    unitPrice: cardContent?.price || ''
  });

  const [errors, setErrors] = useState({
    quantity: ""
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        // You can add logic here if you need to handle the Escape key
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    let errorMessage = "";
    if (id === 'quantity' && value && (!/^\d+$/.test(value) || parseInt(value, 10) < 0)) {
      errorMessage = "Quantity should be a non-negative integer.";
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the quantity field before submission
    if (product.quantity && (!/^\d+$/.test(product.quantity) || parseInt(product.quantity, 10) < 0)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        quantity: "Quantity should be a non-negative integer."
      }));
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await axios.put('http://localhost:8000/api/stock/update', product);
      console.log('Product response:', response.data);
      alert('Product details updated successfully');
      navigate('/currentstock'); // Navigate back to current stock view after successful update
    } catch (err) {
      console.log('Error:', err.response ? err.response.data : err.message);
      alert('An error occurred while updating product details');
    }
  };

  const handleCancel = () => {
    navigate('/currentstock'); // Navigate to current stock view on cancel
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-white">
        <h2 className="text-2xl font-semibold mb-4 text-white">Update Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
            <input
              type="text"
              id="productName"
              value={product.productName}
              readOnly // Make this field read-only
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-white">Newly added Quantity</label>
            <input
              type="text"
              id="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="volume" className="block text-sm font-medium text-white">Volume</label>
            <input
              type="text"
              id="volume"
              value={product.volume}
              readOnly // Make this field read-only
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="unitPrice" className="block text-sm font-medium text-white">Price</label>
            <input
              type="text"
              id="unitPrice"
              value={product.unitPrice}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <PrimaryButton text="Cancel" type="button" onClick={handleCancel} />
            <PrimaryButton text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateInventory;
