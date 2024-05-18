import React from 'react';
import PrimaryButton from './PrimaryButton';
import {useNavigate} from "react-router-dom";

const OrderPopup = ({ onClose }) => {

  const navigate = useNavigate();
  const handleDownloadInvoice = () => {
    // Logic for downloading invoice
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-800 p-10 rounded-lg w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">YOUR ORDER HAS PLACED!</h2>
        <div className="flex flex-col items-center space-y-4 w-full">
          {/* Button for downloading invoice */}
          <PrimaryButton text="Download Invoice" onClick={handleDownloadInvoice} />
          {/* Button for going back to menu */}
          <PrimaryButton text="Go Back to Menu" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
