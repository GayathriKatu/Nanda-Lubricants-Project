import React from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function UpdateStaff({ onClose }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/staffdetails');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-white">Update Staff</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white">Username</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Full Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-white">Contact No</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white" />
          </div>
          <div className="flex justify-end gap-2">
            <PrimaryButton text="Update" onClick={onClose} />
            <PrimaryButton text="Cancel" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStaff;
