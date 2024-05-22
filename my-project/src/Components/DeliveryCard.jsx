import React, { useEffect, useState } from 'react';
import image1 from '../Images/Icon1.png'
import axios from 'axios';

function DeliveryCard({cardContent, index}) {
  // const [details, setDetails] = useState([]);

  // const fetchDetails = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/api/order/details");
  //     setDetails(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchDetails();
  // }, []);

  return (
    
      <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      
        {/* {details.length === 0 ? (
          <div>No details available</div>
        ) : (
          details.map((delivery, index) => ( */}
            <div className="flex flex-grow p-4 justify-between" >
              <div className="flex flex-col w-1/5 pr-4">
                <p className="text-white text-base font-bold mb-2">Order ID</p>
                <p className="text-white text-base mb-2">{cardContent.orderId}</p>
              </div>
              <div className="flex flex-col w-1/5 pr-4">
                <p className="text-white text-base font-bold mb-2">Shop Name</p>
                <p className="text-white text-base mb-2">{cardContent.shopName}</p>
              </div>
              <div className="flex flex-col w-1/5 pr-4">
                <p className="text-white text-base font-bold mb-2">Route</p>
                <p className="text-white text-base mb-2">{cardContent.routeName}</p>
              </div>
              <div className="flex flex-col w-1/5 pr-4">
                <p className="text-white text-base font-bold mb-2">Order Date</p>
                <p className="text-white text-base mb-2">{cardContent.datePlaced}</p>
              </div>
              <div className="flex flex-col w-1/5 pr-4">
                <p className="text-white text-base font-bold mb-2">Total Price</p>
                <p className="text-white text-base mb-2">{cardContent.totalPrice}</p>
              </div>
            </div>
          {/* ))
        )} */}
      </div>

  );
}

export default DeliveryCard;