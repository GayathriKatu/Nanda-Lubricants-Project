import React, { useState } from 'react';
import PrimaryButton from "../Components/PrimaryButton"; // Import the PrimaryButton component

function UserTypeSelection({ onSelect }) {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the popup

  // Function to handle user type selection
  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
    onSelect(userType); // Notify parent component of the selected user type
    setIsOpen(false); // Close the popup after selection
  };

  return (
    <div>
      <button className="bg-transparent text-white" onClick={() => setIsOpen(true)}>
        Open User Type Selection
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <PrimaryButton text="User Type 1" onClick={() => handleUserTypeSelection('User Type 1')} />
            <PrimaryButton text="User Type 2" onClick={() => handleUserTypeSelection('User Type 2')} />
            <PrimaryButton text="User Type 3" onClick={() => handleUserTypeSelection('User Type 3')} />
            {/* Add more buttons for other user types as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTypeSelection;
