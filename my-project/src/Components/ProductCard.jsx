import React, { useEffect, useState } from 'react';
import image1 from '../Images/Icon1.png';
import PrimaryButton from '../Components/PrimaryButton'; // Import the PrimaryButton component
import axios from 'axios';

function ProductCard() {
  const [details, setDetails] = useState([]);

  // Fetch data
  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/stock/details");
      setDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDelete = async (stockId) => {
    console.log(stockId)
    try {
      await axios.delete(`http://localhost:8000/api/stock/delete/${stockId}`);
      // Optionally, update state or perform any other action after successful deletion
      // You may want to refetch the data after deletion to update the UI
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5">
      {details.length === 0 ? (
        <div>No details available</div>
      ) : (
        details.map((stock, index) => (
          <div key={index} className="flex flex-grow p-4 justify-between">
            <div className="flex flex-col w-1/4 pr-4">
              <p className="text-white text-base font-bold mb-2">{stock.product}</p>
              {/* <p className="text-white text-base mb-2">{category}</p> */}
            </div>
            <div className="flex flex-col w-1/4 pr-4">
              <p className="text-white text-base font-bold mb-2">In Stock</p>
              <p className="text-white text-base mb-2">{stock.stock}</p>
            </div>
            <div className="flex flex-col w-1/4 pr-4">
              <p className="text-white text-base font-bold mb-2">Volume</p>
              <p className="text-white text-base mb-2">{stock.volume}</p>
            </div>
            <div className="flex flex-col w-1/4 pr-4">
              <p className="text-white text-base font-bold mb-2">Price (Rs.)</p>
              <p className="text-white text-base mb-2">{stock.price}</p>
            </div>

            <div className="flex items-center">
              <div className='mr-2'>
                <PrimaryButton text="Update" />
              </div>
              <div>
                <PrimaryButton text="Delete" onClick={() => handleDelete(stock.stockId)} />
                {/* <button onClick={() => handleDelete(stock.stockId)}>delete</button> */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductCard;
