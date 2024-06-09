import React, { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '../Components/PrimaryButton';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddStaffPopup({ onClose, fetch }) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const saveAdd = async (data) => {
        try {
            const res = await axios.post('http://localhost:8000/api/staff/register', data);
            console.log(res);
            if (res.status === 200) {
                onClose();
                fetch();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('The staff user name already exists');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl mb-4 text-white">Add New Staff</h2>
                <form onSubmit={handleSubmit(saveAdd)}>
                    <div className="mb-4">
                        <label className="block text-white">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            autoComplete="off"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                maxLength: { value: 12, message: 'Password must be less than 12 characters' }
                            })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            autoComplete="off"
                            {...register('fullName', {
                                required: 'Full Name is required',
                                maxLength: { value: 20, message: 'Full Name must be less than or equal to 20 characters' }
                            })}
                        />
                        {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Contact No</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            autoComplete="off"
                            {...register('contactNo', {
                                required: 'Contact No is required',
                                pattern: { value: /^\d{10}$/, message: 'Contact No must be a non-negative integer and exactly 10 characters' }
                            })}
                        />
                        {errors.contactNo && <span className="text-red-500">{errors.contactNo.message}</span>}
                    </div>
                    <div className="flex justify-end gap-2">
                        <PrimaryButton text="Add" type="submit" />
                        <PrimaryButton text="Cancel" onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStaffPopup;
