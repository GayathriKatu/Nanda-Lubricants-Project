import React from 'react';
import PrimaryButton from '../Components/PrimaryButton';


const PreviewComponent = ({ tableRows }) => {
  // Calculate the total
  const total = tableRows.reduce((acc, row) => acc + parseFloat(row.quantity * row.unitPrice), 0).toFixed(2);

  return (
    <div className="bg-gray-800 h-screen">
      <div className="bg-white bg-opacity-10 rounded-lg mx-auto max-w-screen-md p-4 ">
        <p className="text-3xl text-white font-semibold mb-6">ORDER PREVIEW</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800">Product ID</th>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800">Product Name</th>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800">Volume</th>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800">Quantity</th>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800">Unit Price</th>
              <th className="py-2 px-4 border border-gray-300 text-white bg-gray-800 text-right">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800">{row.pid}</td>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800">{row.product}</td>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800">{row.volume}</td>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800">{row.quantity}</td>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800">{row.unitPrice}</td>
                <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800 text-right">{row.quantity * row.unitPrice}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="py-2 px-4 border border-gray-300 text-white bg-gray-800 text-right font-semibold">Total:</td>
              <td className="py-2 px-4 border border-gray-300 text-gray-200 bg-gray-800 text-right font-semibold">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviewComponent;
