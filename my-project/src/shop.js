import React, { useState, useEffect } from 'react';
import PrimaryButton from './Components/PrimaryButton';
import PreviewComponent from './Components/PreviewComponent';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

function Shop() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user_id']);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [products, setProducts] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [productName,setProductName] = useState(null);
    const [productVolume,setProductVolume] = useState(null);

    const fetchDetails = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/products/details");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const saveAdd = async (data) => {
        setTableRows((prevTableRows) => [...prevTableRows, data]);
        setValue('product',null);
        setValue('quantity',null);
        setValue('volume',null);
        setValue('unitPrice',null);
        setProductName(null);
        setProductVolume(null); 
    };
    
    const placeOrder = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/order/addFullOrder", tableRows);
            if (res.status === 200) {
                reset();
                console.log("Added Success");
                navigate('/orderpopup', { state: { tableRows } });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (cookies.user_id) {
            setValue('user', cookies.user_id);
        }
    }, [cookies.user_id]);

    const fetchUnitPrice = async () => {
        if (productName && productVolume) {
            try {
                const res = await axios.post("http://localhost:8000/api/stock/unitPrice", { productName,productVolume });
                if (res.status === 200) {
                    setValue('unitPrice', res.data[0].UNIT_PRICE);
                    console.log(res.data[0].UNIT_PRICE);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(()=>{
        fetchUnitPrice();
    },[productName,productVolume])

    const volumeOptions = [
        '1 L',
        '5 L',
        '20 L',
        '210 L'
    ];

    const categoryOptions = [
        'Diesel',
        'Petrol',
        'Motor Cycle Oil',
        'Three Wheeler Oil',
        'UTT Oil',
        'Outboard Oil',
        'Greases',
        'Industrial and Hydraulic Oil',
        'Premium ECO Plus',
        'Transmission Oil'
    ];

    return (
        <div className="bg-gray-800 min-h-screen px-24 py-10">
            <div className="flex mb-8">
                <p className="text-3xl text-white font-semibold px-7">ORDER</p>
            </div>
            <div className="container p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg shadow text-white flex flex-col">
                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                        <form onSubmit={handleSubmit(saveAdd)}>
                            <div>
                                {/* <label>Category:</label>
                                <select
                                    {...register('category', { required: 'Category is required' })}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
                                >
                                    <option value="">Select Category</option>
                                    {categoryOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500">{errors.category.message}</p>} */}

                                <label>Product:</label>
                                <select
                                    {...register('product', { required: 'Product is required' })}
                                    onChange={(e) => {
                                        const selectedIndex = e.target.selectedIndex;
                                        const selectedOption = e.target.options[selectedIndex];
                                        setValue('pid', selectedOption.getAttribute('pid'));
                                        setProductName(e.target.value);
                                    }}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
                                >
                                    <option value="">Select Product</option>
                                    {products.map((product, index) => (
                                        <option key={index} value={product.productName}
                                            unitprice={product.unitPrice} pid={product.productId} >
                                            {product.productName}
                                        </option>
                                    ))}
                                </select>
                                {errors.product && <p className="text-red-500">{errors.product.message}</p>}

                                <label>Quantity:</label>
                                <input
                                    type="text"
                                    // type="number"
                                    // min={1}
                                    // autoComplete='off'
                                    {...register('quantity', {
                                        required: 'Quantity is required',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Invalid Quantity'
                                        }
                                    })}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-2"
                                />
                                {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}

                                <label>Volume:</label>
                                <select
                                    {...register('volume', { required: 'Volume is required' })}
                                    onClick={(e)=>{setProductVolume(e.target.value)}}
                                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md mb-4"
                                >
                                    <option value="">Select Volume</option>
                                    {volumeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.volume && <p className="text-red-500">{errors.volume.message}</p>}
                            </div>
                            <div className="flex justify-end mt-4">
                                <input type='hidden' {...register('user')} />
                                <input type='hidden' {...register('unitPrice')} />
                                <input type='hidden' {...register('pid')} />
                                <PrimaryButton text="Add" type="submit" />
                            </div>
                        </form>
                    </div>
                    <div className="bg-transparent">
                        <PreviewComponent tableRows={tableRows} />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <PrimaryButton text="Place Order" onClick={placeOrder} />
                </div>
            </div>
        </div>
    );
}

export default Shop;
