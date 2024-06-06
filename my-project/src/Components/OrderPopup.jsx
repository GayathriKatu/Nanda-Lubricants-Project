import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../Images/NandaLogo.png'; // Ensure the path to the logo is correct

const OrderPopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tableRows } = location.state; // Receive tableRows via location.state

  const generatePDF = () => {
    const total = tableRows.reduce((acc, row) => acc + parseFloat(row.quantity * row.unitPrice), 0).toFixed(2);
    const doc = new jsPDF();

    // Add custom header with logo
    doc.addImage(logo, 'PNG', 180, 10, 15, 15); // Adjust dimensions as needed
    doc.setFontSize(18);
    doc.setTextColor(81, 130, 200); // Set text color to blue (RGB: 81, 130, 200)
    doc.text("Nanda Lubricants", 14, 22);
    
    // Reset font size and color for other text
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Set text color to black (RGB: 0, 0, 0)
    doc.text("Contact: +94 371933455", 14, 28);
    doc.text("Address: Nanda Lubricants, Colombo road, Kurnegala", 14, 32);

    // Add title
    doc.setFontSize(16);
    doc.text("Invoice", 14, 40);
    
    // Reset font size for table
    doc.setFontSize(10);

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
      startY: 50, // Adjust start position after the title
    });

    doc.text(`Total: Rs. ${total}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text("The order will be delivered within a week.", 14, doc.autoTable.previous.finalY + 20);
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
