import React from 'react';
import PrimaryButton from './PrimaryButton';

const OrderPopup = ({ onClose }) => {
  const handleDownloadInvoice = () => {
    // Logic for downloading invoice
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-500 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Popup Title</h2>
        <div className="flex justify-between">
          {/* Button for downloading invoice */}
          <PrimaryButton text="Download Invoice" onClick={handleDownloadInvoice} />
          {/* Button for going back to menu */}
          <PrimaryButton text="Go Back to Menu" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
