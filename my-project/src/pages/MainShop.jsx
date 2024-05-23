import React, { useState, useEffect } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import ProductComponent from "../Components/ProductComponent";
import Inquiry from "./Inquiry"; // Import the inquiry popup component
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
  // Mock data for product cards
  // const products = [
  //   {
  //     productId: 'P001',
  //     productName: 'Product 1',
  //     category: 'Category 1',
  //     description: 'Description of Product 1',
  //     unitPrices: {
  //       '1L': 10,
  //       '2L': 20,
  //       '3L': 30,
  //       '4L': 40
  //     }
  //   },
  //   {
  //     productId: 'P001',
  //     productName: 'Product 1',
  //     category: 'Category 1',
  //     description: 'Description of Product 1',
  //     unitPrices: {
  //       '1L': 10,
  //       '2L': 20,
  //       '3L': 30,
  //       '4L': 40
  //     }
  //   },

  //   {
  //     productId: 'P001',
  //     productName: 'Product 1',
  //     category: 'Category 1',
  //     description: 'Description of Product 1',
  //     unitPrices: {
  //       '1L': 10,
  //       '2L': 20,
  //       '3L': 30,
  //       '4L': 40
  //     }
  //   },

  //   {
  //     productId: 'P001',
  //     productName: 'Product 1',
  //     category: 'Category 1',
  //     description: 'Description of Product 1',
  //     unitPrices: {
  //       '1L': 10,
  //       '2L': 20,
  //       '3L': 30,
  //       '4L': 40
  //     }
  //   },

  //   {
  //     productId: 'P001',
  //     productName: 'Product 1',
  //     category: 'Category 1',
  //     description: 'Description of Product 1',
  //     unitPrices: {
  //       '1L': 10,
  //       '2L': 20,
  //       '3L': 30,
  //       '4L': 40
  //     }
  //   },

  //   // Add more products as needed
  // ];

  // State to control the visibility of the inquiry popup
  const [showInquiry, setShowInquiry] = useState(false);

  // Function to open the inquiry popup
  const openInquiry = () => {
    setShowInquiry(true);
  };

  // Function to close the inquiry popup
  const closeInquiry = () => {
    setShowInquiry(false);
  };

  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/details");
      setDetails(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <p className="text-3xl font-semibold">SHOP</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <PrimaryButton text="+ Place an Inquiry" onClick={openInquiry} />
          </div>
          <div>
            <PrimaryButton text="+ Place an Order" onClick={() => navigate("/shop")}/>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4 mt-6">

        
         

        {details.map((detail, index) => (
          <div className="flex w-[21rem] shrink-0" key={index}>
            <ProductComponent cardContent={detail} index={index}/>
            
          </div>
        ))}

        {/* {products.map((product, index) => (
          <ProductComponent
            key={index}
            productId={product.productId}
            productName={product.productName}
            category={product.category}
            description={product.description}
            unitPrices={product.unitPrices}
          />
        ))} */}
      </div>

      {/* Render the inquiry popup conditionally based on the state */}
      {showInquiry && (
        <Overlay>
          <Inquiry onClose={closeInquiry} />
        </Overlay>
      )}
    </div>
  );
}

export default MainShop;
