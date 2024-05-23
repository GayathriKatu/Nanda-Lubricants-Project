import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import BankDetailsPopup from './BankPopup';
import PrimaryButton from './Components/PrimaryButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const { register, reset, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bankDetails, setBankDetails] = useState({ bankName: '', accountName: '', accountNumber: '' });

    const saveAdd = async (data) => {
        try {
            const res = await axios.post('http://localhost:8000/api/retailer/register', data);
            if (res.status === 200) {
                reset({
                    shopName: '',
                    address: '',
                    route: '',
                    contactNumber: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleBankDetailsSubmit = (data) => {
        setBankDetails(data);
        closePopup();
    };

    return (
        <div className="flex justify-center bg-gray-800">
            <div className="w-1/2 mx-4 mt-20">
                <h2 className="mb-4 text-xl text-white">Retailer Details</h2>
                <form onSubmit={handleSubmit(saveAdd)}>
                    <div className="mb-4">
                        <label htmlFor="shopName" className="block mb-2 text-white">Shop Name:</label>
                        <input
                            id="shopName"
                            type="text"
                            {...register('shopName')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-2 text-white">Address:</label>
                        <input
                            id="address"
                            type="text"
                            {...register('address')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="route" className="block mb-2 text-white">Route:</label>
                        <input
                            id="route"
                            type="text"
                            {...register('route')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block mb-2 text-white">Contact Number:</label>
                        <input
                            id="contactNumber"
                            type="tel"
                            {...register('contactNumber')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-white">Email Address:</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={openPopup}
                        className="bg-[#D4C5A9] text-black font-medium py-2 px-4 rounded-md hover:bg-[#b3a081] transition duration-300 mb-8"
                    >
                        Enter Bank Details
                    </button>

                </form>
            </div>
            <div className="w-1/2 mx-4 mt-20">
                <h1 className="mb-4 text-xl text-white">Create Account</h1>
                <form onSubmit={handleSubmit(saveAdd)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-white">Username:</label>
                        <input
                            id="username"
                            type="text"
                            {...register('username')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-white">Password:</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 text-white">Re-enter Password:</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <PrimaryButton text="Register" type="submit" className="w-full" />
                </form>
            </div>
            {isPopupOpen && (
                <BankDetailsPopup
                    onClose={closePopup}
                    onSubmit={handleBankDetailsSubmit}
                />
            )}
        </div>
    );
};

export default RegisterPage;
