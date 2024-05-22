import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import PrimaryButton from "../Components/PrimaryButton";
import DropDown from "../Components/DropDown";
import ProductCard from "../Components/ProductCard";
import UpdateStock from "./UpdateStock";
import axios from 'axios';

function CurrentStock() {
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [reorderProducts, setReorderProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [SelectedStockAlert, setSelectedStockAlert] = useState('');
  const [SelectedCategory, setSelectedCategory] = useState('');
  const [showUpdateStock, setShowUpdateStock] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const fetchDetails = async () => {
    try {
      const productRes = await axios.get("http://localhost:8000/api/products/productnames");
      setProducts(productRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const orderRes = await axios.get("http://localhost:8000/api/stock/details");
      setDetails(orderRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOutOfStock = async () => {
    try {
      const outOfStockRes = await axios.get("http://localhost:8000/api/stock/stockout");
      setOutOfStock(outOfStockRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReOrder = async () => {
    try {
      const reorderRes = await axios.get("http://localhost:8000/api/stock/reorder");
      setReorderProducts(reorderRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchOrderDetails();
    fetchOutOfStock();
  }, []);

  useEffect(() => {
    if (selectedSortBy === 'Re order') {
      fetchReOrder();
    }
  }, [selectedSortBy]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
    setShowUpdateStock(true);
  };

  const closeUpdateStock = () => {
    setShowUpdateStock(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsSearchFocused(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const getFilteredData = () => {
    let filteredData = details;

    if (selectedSortBy === 'Out of stock') {
      filteredData = outOfStock;
    } else if (selectedSortBy === 'Re order') {
      filteredData = reorderProducts;
    }

    if (searchTerm) {
      filteredData = filteredData.filter(product =>
        product.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  };

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="text-3xl font-semibold">CURRENT STOCK</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex bg-opacity-0">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchInputChange}
              suggestions={isSearchFocused ? filteredProducts : []}
              onSuggestionClick={handleSuggestionClick}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </div>
          <div>
            <PrimaryButton text="Add Product" onClick={openUpdateStock} />
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
              options={['Re order', 'Out of stock']}
              value={selectedSortBy}
              onChange={handleSortBy} />
          </div>
        </div>
      </div>

      <div className="justify-between mt-8 gap-1">
        {getFilteredData().map((product, index) => (
          <ProductCard key={index} cardContent={product} index={index} />
        ))}
      </div>

      {showUpdateStock && (
        <Overlay>
          <UpdateStock onClose={closeUpdateStock} />
        </Overlay>
      )}
    </div>
  );
}

function Overlay({ children, width = "full", height = "full" }) {
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-${width} h-${height}`}>
      {children}
    </div>
  );
}

export default CurrentStock;
