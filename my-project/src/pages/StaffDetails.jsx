import React, { useEffect, useState } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import StaffCard from "../Components/StaffCard";
import AddStaffPopup from "../Components/AddStaffPopup";
import axios from "axios";

function StaffDetails() {
    const [showAddStaff, setShowAddStaff] = useState(false);
    const [staffData,setStaffData] = useState([]);

    const openAddStaff = () => {
        setShowAddStaff(true);
    };

    const closeAddStaff = () => {
        setShowAddStaff(false);
    };

    const fetchRecords = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/staff/list");
            if(res.data) {
                setStaffData(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchRecords();
    },[])

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
                {staffData.map((staff, index) => (
                    <StaffCard key={index} cardContent={staff} index={index} />
                ))}
            </div>

            {showAddStaff && <AddStaffPopup onClose={closeAddStaff} fetch={fetchRecords} />}
        </div>
    );
}

export default StaffDetails;
