import React, { useState, useEffect } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import ProductComponent from "../Components/ProductComponent";
import Inquiry from "./Inquiry"; // Import the inquiry popup component
import SearchBar from "../Components/SearchBar"; // Import the SearchBar component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

// Overlay component
function Overlay({ children, width = "full", height = "full" }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-${width} h-${height}`}
    >
      {children}
    </div>
  );
}

function MainShop() {
  // State to control the visibility of the inquiry popup
  const [showInquiry, setShowInquiry] = useState(false);
  const [cookies] = useCookies(['user_id']);
  const [retailer, setRetailer] = useState([]);
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Function to open the inquiry popup
  const openInquiry = () => {
    setShowInquiry(true);
  };

  // Function to close the inquiry popup
  const closeInquiry = () => {
    setShowInquiry(false);
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/mainshopdetails");
      setDetails(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLoginRetailer = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/retailer/details-by-user", {
        headers: {
          user_id: cookies.user_id
        }
      });
      setRetailer(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchLoginRetailer();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(details);
    } else {
      setFilteredProducts(details.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <p className="text-3xl font-semibold">SHOP</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-white">Search Product</label>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchInputChange}
            suggestions={isSearchFocused ? details.map(d => d.productName) : []}
            onSuggestionClick={handleSuggestionClick}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <PrimaryButton text="+ Place an Inquiry" onClick={openInquiry} />
          </div>
          <div>
            <PrimaryButton text="+ Place an Order" onClick={() => navigate("/shop")} />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4 mt-6">
        {filteredProducts.map((detail, index) => (
          <div className="flex w-[21rem] shrink-0" key={index}>
            <ProductComponent cardContent={detail} index={index} />
          </div>
        ))}
      </div>

      {showInquiry && (
        <Overlay>
          <Inquiry onClose={closeInquiry} retailer={retailer} />
        </Overlay>
      )}
    </div>
  );
}

export default MainShop;
