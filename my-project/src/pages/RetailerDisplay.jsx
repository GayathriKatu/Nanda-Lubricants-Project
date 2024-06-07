import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import RetailerCard from '../Components/RetailerCard';
import axios from 'axios';

function RetailerDisplay() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRetailers, setFilteredRetailers] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/retailer/retailerdetails");
      setDetails(res.data);
      setFilteredRetailers(res.data); // Initialize filtered retailers with all details
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    const filtered = details.filter(retailer =>
      retailer.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRetailers(filtered);
  }, [searchTerm, details]);

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

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="mt-8 mb-10 text-3xl font-semibold">RETAILER DETAILS</p>
        </div>
        <div className="flex items-center gap-2">
        <p className="text-xsm ">Search Shop Name</p>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchInputChange}
            suggestions={isSearchFocused ? filteredRetailers.map(r => r.shopName) : []}
            onSuggestionClick={handleSuggestionClick}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </div>
      </div>
      <div className="justify-between mt-8 gap-1">
        {filteredRetailers.map((detail, index) => (
          <RetailerCard key={index} cardContent={detail} index={index} />
        ))}
      </div>
    </div>
  );
}

export default RetailerDisplay;
