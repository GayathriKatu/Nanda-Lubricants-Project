import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DateTimePicker from "../Components/DateTimePicker";
import PrimaryButton from "../Components/PrimaryButton";
import DropDown from "../Components/DropDown";
import DeliveryCard from "../Components/DeliveryCard";
import logo from "../Images/NandaLogo.png";

function DeliverySchedule() {
  const [selectedSortByRoute, setSelectedSortByRoute] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  // Fetch data from the backend
  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/order/details");
      console.log(res);
      setDetails(res.data);
      setFilteredDetails(res.data); // Initialize filteredDetails with all details
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSortByRoute = (e) => {
    setSelectedSortByRoute(e.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  // Filter the details based on the selected route and date range
  const filterDetails = () => {
    const filteredByRoute = selectedSortByRoute
      ? details.filter(detail => detail.routeName === selectedSortByRoute)
      : details;

    const filteredByDate = filteredByRoute.filter(detail => {
      const orderDate = new Date(detail.datePlaced);
      return orderDate >= fromDate && orderDate <= toDate;
    });

    setFilteredDetails(filteredByDate);
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add custom header
    doc.setFontSize(18);
    doc.setTextColor(81, 130, 200); // Set text color to blue (RGB: 0, 0, 255)
    doc.text("Nanda Lubricants", 14, 22);
    
    // Reset font size and color for other text
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Set text color to black (RGB: 0, 0, 0)
    doc.text("Contact: +94 371933455", 14, 28);
    doc.text("Address: Nanda Lubricants, Colombo road, Kurnegala", 14, 32);

    // Add space before table
    doc.addImage(logo, 'JPEG', 180, 10, 15, 15);
    doc.text(`Filtered Route: ${selectedSortByRoute || "All Routes"}`, 14, 42);
    doc.text(`Date Range: ${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`, 14, 48);
    
    const tableData = filteredDetails.map((detail) => [
      detail.orderId,
      detail.shopName,
      detail.routeName,
      new Date(detail.datePlaced).toLocaleDateString(),
      detail.totalPrice, // Add totalPrice to the table data
    ]);

    doc.autoTable({
      startY: 54, // Adjust start position after the custom header
      head: [["Order ID", "Shop Name", "Route Name", "Date Placed", "Total Price(Rs)"]],
      body: tableData,
    });

    doc.save("delivery_schedule.pdf");
  };

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="text-3xl font-semibold">DELIVERY SCHEDULE</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <PrimaryButton text="Download PDF" onClick={generatePDF} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-12">
        <div className="flex items-center">
          <label
            htmlFor="sortbyRoute"
            className="block text-sm text-white font-medium mr-2"
          >
            SORT BY ROUTE
          </label>
          <div className="relative">
            <DropDown
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-black"
              id="sortbyRoute"
              options={['Wariyapola','Alawwa','Mawathagama','Mahawa','Hettipola','Melsiripura','Kuliyapitiya','Nikaweratiya',
                'Kaduwela','Puttlam','Kalpitiya','Bingiriya','Dambadeniya','Naththandiya','Dankotuwa','Hiripitiya']}
              value={selectedSortByRoute}
              onChange={handleSortByRoute}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="fromDate"
            className="block text-sm text-white font-medium mr-2"
          >
            FROM
          </label>
          <div className="relative">
            <DateTimePicker 
              selectedDate={fromDate}
              handleChange={handleFromDateChange}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="toDate"
            className="block text-sm text-white font-medium mr-2"
          >
            TO
          </label>
          <div className="relative">
            <DateTimePicker 
              selectedDate={toDate}
              handleChange={handleToDateChange}
            />
          </div>
        </div>

        <div className="flex items-center">
          <PrimaryButton text="FILTER" onClick={filterDetails} />
        </div>
      </div>

      <div className="justify-between mt-8 gap-1">
        {filteredDetails.map((detail, index) => (
          <DeliveryCard key={index} cardContent={detail} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default DeliverySchedule;
