import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useNavigate } from "react-router-dom";

function StaffCard({ cardContent, index }) {
  const navigate = useNavigate();

  const handleDelete = (staffId) => {
    console.log(staffId);
  };

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between">
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Username</p>
          <p className="text-white text-base mb-2">{cardContent.username}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Full Name</p>
          <p className="text-white text-base mb-2">{cardContent.fullName}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Contact Number</p>
          <p className="text-white text-base mb-2">{cardContent.contact}</p>
        </div>
        <div className="flex items-center">
          <div className='mr-2'>
            <PrimaryButton text="Update" onClick={() => navigate("/updatestaff")} />
          </div>
          <div>
            <PrimaryButton text="Delete" onClick={() => handleDelete(cardContent.staffId)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffCard;
