import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderPopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableRows } = location.state; // Receive tableRows via location.state

  const generatePDF = () => {
    const total = tableRows.reduce((acc, row) => acc + parseFloat(row.quantity * row.unitPrice), 0).toFixed(2);
    const doc = new jsPDF();
    doc.text('Order Preview', 20, 10);

    const tableColumn = ["Product ID", "Product Name", "Volume", "Quantity", "Unit Price", "SubTotal"];
    const tableRowsData = [];

    tableRows.forEach(row => {
      const rowData = [
        row.pid,
        row.product,
        row.volume,
        row.quantity,
        row.unitPrice,
        (row.quantity * row.unitPrice).toFixed(2),
      ];
      tableRowsData.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRowsData,
      startY: 20,
    });

    doc.text(`Total: ${total}`, 20, doc.autoTable.previous.finalY + 10);
    doc.save('order_preview.pdf');
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-800 p-10 rounded-lg w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">YOUR ORDER HAS PLACED!</h2>
        <div className="flex flex-col items-center space-y-4 w-full">
          {/* Button for downloading invoice */}
          <PrimaryButton text="Download Invoice" onClick={generatePDF} />
          {/* Button for going back to menu */}
          <PrimaryButton text="Go Back to Menu" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
