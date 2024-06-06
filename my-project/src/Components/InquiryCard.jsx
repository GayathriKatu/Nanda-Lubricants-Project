import React from 'react';
import PrimaryButton from './PrimaryButton';
import axios from 'axios';

function InquiryCard({ cardContent, index, onDelete }) {

  const handleDelete = async (inquiryId) => {
    console.log(inquiryId);
    try {
      await axios.delete(`http://localhost:8000/api/inquiry/delete/${inquiryId}`);
      // Optionally, update state or perform any other action after successful deletion
      if (onDelete) {
        onDelete(inquiryId);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between">
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
          <p className="text-white text-base mb-2">{formatDate(cardContent.inquiryDate)}</p>
        </div>
        <div className="flex items-center">
          <PrimaryButton text="Delete" onClick={() => handleDelete(cardContent.inquiryId)} />
        </div>
      </div>
    </div>
  );
}

export default InquiryCard;
