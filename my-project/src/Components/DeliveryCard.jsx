import React, { useState } from 'react';

function DeliveryCard({ cardContent, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between">
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
        <div className="flex items-center">
          <button onClick={toggleExpand} className="text-white text-base font-bold mb-2">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="text-left font-bold pr-4">Product Name</th>
                <th className="text-left font-bold pr-4">Volume</th>
                <th className="text-left font-bold pr-4">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cardContent.details.map((detail, idx) => (
                <tr key={idx}>
                  <td className="pr-4">{detail.productName}</td>
                  <td className="pr-4">{detail.volume}</td>
                  <td className="pr-4">{detail.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeliveryCard;
