import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BankDetailsPopup from './BankPopup';
import PrimaryButton from './Components/PrimaryButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ROUTES = [
    'Wariyapola 01',
    'Pothuhera',
    'Route 3',
    'Route 4',
    'Route 5',
    'Route 6',
    'Route 7',
    'Route 8',
    'Route 9',
    'Route 10',
    'Route 11',
    'Route 12',
    'Route 13',
    'Route 14',
    'Route 15'
];

const RegisterPage = () => {
    const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
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
                            autoComplete='off'
                            type="text"
                            {...register('shopName')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-2 text-white">Address:</label>
                        <input
                            id="address"
                            autoComplete='off'
                            type="text"
                            {...register('address', { 
                                maxLength: { value: 50, message: "Address must be less than 50 characters" } 
                            })}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="route" className="block mb-2 text-white">Route:</label>
                        <select
                            id="route"
                            {...register('route')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        >
                            <option value="">Select a route</option>
                            {ROUTES.map(route => (
                                <option key={route} value={route}>{route}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block mb-2 text-white">Contact Number:</label>
                        <input
                            id="contactNumber"
                            autoComplete='off'
                            type="tel"
                            {...register('contactNumber', { 
                                pattern: { value: /^[0-9]{10}$/, message: "Contact number must be exactly 10 digits" } 
                            })}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                        {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-white">Email Address:</label>
                        <input
                            id="email"
                            autoComplete='off'
                            type="email"
                            {...register('email', { 
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                                validate: {
                                    noUppercase: value => value === value.toLowerCase() || "Email address must not contain uppercase letters"
                                }
                            })}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                </form>
            </div>
            <div className="w-1/2 mx-4 mt-20">
                <h1 className="mb-4 text-xl text-white">Create Account</h1>
                <form onSubmit={handleSubmit(saveAdd)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-white">Username:</label>
                        <input
                            id="username"
                            autoComplete='off'
                            type="text"
                            {...register('username')}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-white">Password:</label>
                        <input
                            id="password"
                            autoComplete='off'
                            type="password"
                            {...register('password', { 
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                maxLength: { value: 12, message: "Password must be less than 12 characters" },
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }
                            })}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 text-white">Re-enter Password:</label>
                        <input
                            id="confirmPassword"
                            autoComplete='off'
                            type="password"
                            {...register('confirmPassword', { 
                                validate: value => value === watch('password') || "Passwords do not match" 
                            })}
                            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded text-black opacity-20"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
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
