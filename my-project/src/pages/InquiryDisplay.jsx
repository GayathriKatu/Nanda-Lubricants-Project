import React, { useState, useEffect } from "react";
import InquiryCard from '../Components/InquiryCard';
import axios from 'axios';

function InquiryDisplay() {

  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/inquiry/details");
      console.log(res);
      setDetails(res.data); // Initialize filteredDetails with all details
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <p className="mt-8 mb-10 text-3xl font-semibold">INQUIRIES</p>
        </div>
      </div>
      <div className="justify-between mt-8 gap-1">
        {details.map((detail, index) => (
      <InquiryCard key={index} cardContent={detail} index={index}
      />
    ))}
      </div>
    </div>
  );
}

export default InquiryDisplay;
