import React from 'react';
import InquiryCard from '../Components/InquiryCard';

function InquiryDisplay() {
  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="mt-8 mb-10 text-3xl font-semibold">INQUIRIES</p>
        </div>
      </div>
      <InquiryCard
        cardContent={{
          inquiryId: "1234",
          orderId: "5678",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          inquiryDate: "2024-05-23"
        }}
        index={1}
      />
    </div>
  );
}

export default InquiryDisplay;
