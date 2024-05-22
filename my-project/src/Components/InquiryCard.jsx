import React from 'react';

function InquiryCard({ cardContent, index }) {
  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between" >
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Inquiry ID</p>
          <p className="text-white text-base mb-2">{cardContent.inquiryId}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Order ID</p>
          <p className="text-white text-base mb-2">{cardContent.orderId}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Description</p>
          <p className="text-white text-base mb-2">{cardContent.description}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Inquiry Date</p>
          <p className="text-white text-base mb-2">{cardContent.inquiryDate}</p>
        </div>
      </div>
    </div>
  );
}

export default InquiryCard;
