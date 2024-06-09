import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function StaffCard({ cardContent, index }) {

  const handleDelete = async (staffId, userId) => {
    console.log(staffId, userId);
    try {
      await axios.delete(`http://localhost:8000/api/staff/delete/${staffId}/${userId}`);
      // Optionally, update state or perform any other action after successful deletion
      // You may want to refetch the data after deletion to update the UI
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div className="flex flex-grow p-4 justify-between">
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Username</p>
          <p className="text-white text-base mb-2">{cardContent.userName}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Full Name</p>
          <p className="text-white text-base mb-2">{cardContent.fullName}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Contact Number</p>
          <p className="text-white text-base mb-2">{cardContent.contactNo}</p>
        </div>
        <div className="flex items-center">
          <div className='mr-2'>
            <PrimaryButton text="Update" onClick={() => navigate("/updatestaff", { state: { cardContent } })} />
          </div>
          <div>
            <PrimaryButton text="Delete" onClick={() => handleDelete(cardContent.staffId, cardContent.userId)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffCard;
