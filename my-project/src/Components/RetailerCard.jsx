import React from 'react';

function RetailerCard({ cardContent, index }) {
  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between">
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Retailer ID</p>
          <p className="text-white text-base mb-2">{cardContent.userName}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Shop Name</p>
          <p className="text-white text-base mb-2">{cardContent.shopName}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Address</p>
          <p className="text-white text-base mb-2">{cardContent.address}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Contact Number</p>
          <p className="text-white text-base mb-2">{cardContent.contactNo}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Email</p>
          <p className="text-white text-base mb-2">{cardContent.email}</p>
        </div>
      </div>
    </div>
  );
}

export default RetailerCard;
