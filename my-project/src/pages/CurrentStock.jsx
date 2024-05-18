import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import PrimaryButton from "../Components/PrimaryButton";
import DropDown from "../Components/DropDown";
import ProductCard from "../Components/ProductCard";
import UpdateStock from "./UpdateStock"; // Step 1: Import the UpdateStock component
import axios from 'axios';

function CurrentStock() {
  const [products, setProducts] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [SelectedStockAlert, setSelectedStockAlert] = useState('');
  const [SelectedCategory, setSelectedCategory] = useState('');
  const [showUpdateStock, setShowUpdateStock] = useState(false); // Step 2: State to control the visibility of the popup

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


  const handleSortBy = (e) => {
    setSelectedSortBy(e.target.value);
  };
  const handleStockAlert = (e) => {
    setSelectedStockAlert(e.target.value);
  };
  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const openUpdateStock = () => {
    setShowUpdateStock(true); // Step 3: Function to open the popup
  };

  const closeUpdateStock = () => {
    setShowUpdateStock(false); // Step 3: Function to close the popup
  };                                          

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="text-3xl font-semibold">CURRENT STOCK</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex bg-opacity-0">
            <SearchBar />
          </div>
          <div>
            <PrimaryButton text="Add Product" onClick={openUpdateStock} /> {/* Step 4: Trigger opening of the popup */}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <div className="flex items-center">
          <label htmlFor="sortby" className="block text-sm text-white font-medium mr-2">
            SELECT ROUTE
          </label>
          <div className="relative">
            <DropDown
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black"
              id="sortby"
              options={['Alphabetical A-Z', 'last Update', 'out of stock']}
              value={selectedSortBy}
              onChange={handleSortBy}/>
          </div>
        </div>
        <div className="flex items-center">
          <label htmlFor="stock alert" className="block text-sm font-medium text-white mr-2">
            SELECT ROUTE
          </label>
          <div className="relative">
            <DropDown
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="stock alert"
              options={['Low', 'Medium', 'High']}
              value={SelectedStockAlert}
              onChange={handleStockAlert}/>
          </div>
        </div>
        <div className="flex items-center">
          <label htmlFor="category" className="block text-sm font-medium text-white mr-2">
            SELECT ROUTE
          </label>
          <div className="relative">
            <DropDown
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="category"
              options={['Category 1', 'Category 2', 'Category 3']}
              value={SelectedCategory}
              onChange={handleCategory}/>
          </div>
        </div>
      </div>

      <div className="justify-between mt-8 gap-1">
        {/* <div className="flex flex-col justify-between items-center">
          <ProductCard product="TECHTRON POWER | SAE-10W-30" price="18500" category="Diesel Category" stock="7500" volume="5 L"/>
        </div>
        <div className="flex flex-col justify-between items-center">
          <ProductCard product="TECHTRON POWER | SAE-10W-30" price="18500" category="Diesel Category" stock="7500" volume="5 L"/>
        </div>
        <div className="flex flex-col justify-between items-center">
          <ProductCard product="TECHTRON POWER | SAE-10W-30" price="18500" category="Diesel Category" stock="7500" volume="5 L"/>
        </div>
        <div className="flex flex-col justify-between items-center">
          <ProductCard product="TECHTRON POWER | SAE-10W-30" price="18500" category="Diesel Category" stock="7500" volume="5 L"/>
        </div>
        <div className="flex flex-col justify-between items-center">
          <ProductCard product="TECHTRON POWER | SAE-10W-30" price="18500" category="Diesel Category" stock="7500" volume="5 L"/> */}
        {/* </div> */}
        <ProductCard/>
      </div>

      {showUpdateStock && ( // Step 4: Render UpdateStock component inside an overlay conditionally
        <Overlay>
          <UpdateStock onClose={closeUpdateStock} />
        </Overlay>
      )}
    </div>
  );
}

// Overlay component
function Overlay({ children, width = "full", height = "full" }) {
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-${width} h-${height}`}>
      {children}
    </div>
  );
}

export default CurrentStock;
