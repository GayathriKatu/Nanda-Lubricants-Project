import React, { useState } from 'react';
import PrimaryButton from './Components/PrimaryButton';
import Image from './Images/oil boy2.png'; // Import your image
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    
    const login = async (data) => {
        try {
            const res = await axios.post('http://localhost:8000/api/user/login', data);
            if (res.status === 200) {
                document.cookie = `user_id=${res.data.user}; max-age=${30*60}; path=/`;
                document.cookie = `user_type=${res.data.name}; max-age=${30*60}; path=/`;
                reset();
                if (res.data.name === 'Admin') {
                    navigate('/orderpreview');
                } else {
                    navigate('/mainShop');
                }
            }
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    
    return (
        <div className="flex">
            <div className="w-1/3 bg-white flex items-center justify-center"> {/* Center image */}
                <img src={Image} alt="Logo" className="max-w-md " /> {/* Adjust max width as needed */}
            </div>
            <div className="flex-1 bg-gray-800 p-8 flex justify-center items-center">
                <div className="mb-64 w-full max-w-md ">
                    <h2 className="mt-28 text-2xl font-semibold mb-12 text-white text-center">LOGIN</h2>
                    <form onSubmit={handleSubmit(login)}>
                        <div className="mb-4">
                            <label className="block mb-2 text-white" htmlFor="username">Username:</label>
                            <input
                                id="username"
                                type="text"
                                {...register('username')}
                                className="w-40 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-white" htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className="w-40 px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <PrimaryButton text="Login" type="submit" className="w-full" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
