import React, { useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import StaffCard from "../Components/StaffCard";
import AddStaffPopup from "../Components/AddStaffPopup";

function StaffDetails() {
  const [showAddStaff, setShowAddStaff] = useState(false);

  const dummyStaffData = [
    { username: "Amila Jayasekara", fullName: "A.M.A. Jayasekara", contact: "0711273654" },
    { username: "Amila Jayasekara", fullName: "A.M.A. Jayasekara", contact: "0711273654" },
    { username: "Amila Jayasekara", fullName: "A.M.A. Jayasekara", contact: "0711273654" }
    
  ];

  const openAddStaff = () => {
    setShowAddStaff(true);
  };

  const closeAddStaff = () => {
    setShowAddStaff(false);
  };

  return (
    <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
      <div className="flex justify-between items-center mt-8 mb-6">
        <div className="flex">
          <p className="text-3xl font-semibold">STAFF DETAILS</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <PrimaryButton text="Add Staff" onClick={openAddStaff} />
          </div>
        </div>
      </div>

      <div className="justify-between mt-8 gap-1">
        {dummyStaffData.map((staff, index) => (
          <StaffCard key={index} cardContent={staff} index={index} />
        ))}
      </div>

      {showAddStaff && <AddStaffPopup onClose={closeAddStaff} />}
    </div>
  );
}

export default StaffDetails;
