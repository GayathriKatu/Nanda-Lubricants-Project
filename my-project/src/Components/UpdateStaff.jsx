import React, { useEffect } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UpdateStaff({ onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { cardContent } = location.state || {};
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: cardContent
    });

    useEffect(() => {
        reset(cardContent);
    }, [reset, cardContent]);

    const handleCancel = () => {
        navigate('/staffdetails');
    };

    const saveUpdate = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/staff/update", data);
            console.log(res);
            if (res.status === 200) {
                navigate('/staffdetails');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl mb-4 text-white">Update Staff</h2>
                <form onSubmit={handleSubmit(saveUpdate)}>
                    <div className="mb-4">
                        <label className="block text-white">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            autoComplete="off"
                            {...register('userName', { required: 'Username is required' })}
                        />
                        {errors.userName && <span className="text-red-500">{errors.userName.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                            {...register('password', {
                                validate: value => value.length === 0 || (value.length >= 6 && value.length <= 12) || "Password must be between 6 and 12 characters"
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
                                maxLength: { value: 20, message: 'Full Name must be less than 20 characters' }
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
                                pattern: { value: /^\d{10}$/, message: 'Invalid contact number' }
                            })}
                        />
                        {errors.contactNo && <span className="text-red-500">{errors.contactNo.message}</span>}
                    </div>
                    <div className="flex justify-end gap-2">
                        <PrimaryButton text="Update" type="submit" />
                        <PrimaryButton text="Cancel" onClick={handleCancel} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateStaff;
