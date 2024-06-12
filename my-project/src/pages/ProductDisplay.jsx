import React, { useState, useEffect } from "react";
import PrimaryButton from "../Components/PrimaryButton";
import ProductComponent from "../Components/ProductComponent";
import Inquiry from "./Inquiry";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

function ProductDisplay() {
    const [showInquiry, setShowInquiry] = useState(false);
    const [cookies] = useCookies(['user_id']);
    const [retailer, setRetailer] = useState([]);
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDetails, setFilteredDetails] = useState([]);

    const fetchDetails = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/products/mainshopdetails");
            setDetails(res.data);
            setFilteredDetails(res.data); // Initialize filteredDetails with all products
        } catch (err) {
            console.log(err);
        }
    };

    const fetchLoginRetailer = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/retailer/details-by-user", {
                headers: {
                    user_id: cookies.user_id
                }
            });
            setRetailer(res.data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDetails();
        fetchLoginRetailer();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = details.filter(product =>
            product.productName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredDetails(filtered);
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-screen bg-gray-800 text-white px-12 py-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex">
                    <p className="text-3xl font-semibold">PRODUCTS</p>
                </div>
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="px-3 py-1 bg-gray-700 text-white border border-gray-600 rounded-md"
                    />
                    {/* <div>
                        <PrimaryButton text="+ Place an Inquiry" onClick={openInquiry} />
                    </div> */}
                    {/* <div>
                        <PrimaryButton text="+ Place an Order" onClick={() => navigate("/shop")} />
                    </div> */}
                </div>
            </div>
            {/* Added phrase */}
            <p className="text-lg text-center mb-6">Please Login / Register to Place Orders!</p>
            <div className="flex w-full flex-wrap gap-4 mt-6">
                {filteredDetails.map((detail, index) => (
                    <div className="flex w-[21rem] shrink-0" key={index}>
                        <ProductComponent cardContent={detail} index={index} />
                    </div>
                ))}
            </div>

            {/* {showInquiry && (
                <Overlay>
                    <Inquiry onClose={closeInquiry} retailer={retailer}/>
                </Overlay>
            )} */}
        </div>
    );
}

export default ProductDisplay;
