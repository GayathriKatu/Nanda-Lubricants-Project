import React, { useState } from 'react';
import PrimaryButton from './Components/PrimaryButton';

const BankDetailsPopup = ({ onClose, onSubmit }) => {
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bankName, accountName, accountNumber });
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-500 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Bank Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bankName" className="block mb-2 text-sm font-medium">Bank Name:</label>
            <input
              id="bankName"
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accountName" className="block mb-2 text-sm font-medium">Account Name:</label>
            <input
              id="accountName"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block mb-2 text-sm font-medium">Account Number:</label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
          <PrimaryButton text="Submit" />
            <button type="button" onClick={onClose} className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-[#D4C5A9]">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetailsPopup;
