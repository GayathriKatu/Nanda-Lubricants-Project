import React, { useState } from "react";
import DateTimePicker from "../Components/DateTimePicker";
import PrimaryButton from "../Components/PrimaryButton";
import DropDown from "../Components/DropDown";
import DeliveryCard from "../Components/DeliveryCard";


function DeliverySchedule() {
  const [selectedSortByRoute, setSelectedSortByRoute] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSortByRoute = (e) => {
    setSelectedSortByRoute(e.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
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
              options={["Alphabetical A-Z", "last Update", "out of stock"]}
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
      </div>


      <div className="justify-between mt-8 gap-1">
      {/* <div className="flex flex-col justify-between items-center">
        <DeliveryCard orderId="NL23456" shopName="Darshana Enterprises" route="Wariyapola 01" orderDate="May 02, 2024" totalPrice="663990"/>
      </div>
      <div className="flex flex-col justify-between items-center">
        <DeliveryCard orderId="NL23456" shopName="Darshana Enterprises" route="Wariyapola 01" orderDate="May 02, 2024" totalPrice="663990"/>
      </div>
      <div className="flex flex-col justify-between items-center">
        <DeliveryCard orderId="NL23456" shopName="Darshana Enterprises" route="Wariyapola 01" orderDate="May 02, 2024" totalPrice="663990"/>
      </div>
      <div className="flex flex-col justify-between items-center">
        <DeliveryCard orderId="NL23456" shopName="Darshana Enterprises" route="Wariyapola 01" orderDate="May 02, 2024" totalPrice="663990"/>
      </div>
      <div className="flex flex-col justify-between items-center">
        <DeliveryCard orderId="NL23456" shopName="Darshana Enterprises" route="Wariyapola 01" orderDate="May 02, 2024" totalPrice="663990"/>
      </div> */}
      <DeliveryCard/>
      </div>
      
    </div>
  );
}

export default DeliverySchedule;
