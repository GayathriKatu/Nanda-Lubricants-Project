import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "../Components/DateTimePicker";
import PrimaryButton from "../Components/PrimaryButton";
import DropDown from "../Components/DropDown";
import DeliveryCard from "../Components/DeliveryCard";

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

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="text-3xl font-semibold">DELIVERY SCHEDULE</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <PrimaryButton text="PRINT" />
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
              options={["Wariyapola 01", "Pothuhera", "Kadawatha 01"]}
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
