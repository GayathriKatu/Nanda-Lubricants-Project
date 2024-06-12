import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bestCustomerImage from '../Images/Best Customers.png'; // Adjust the path as necessary

const BestCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchBestCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/order/topcustomers');
        setCustomers(res.data);
      } catch (error) {
        console.error('Error fetching best customers', error);
      }
    };

    fetchBestCustomers();
  }, []);

  return (
    <div className="bg-white bg-opacity-10 shadow-md rounded p-4">
      <h2 className="text-3xl mb-6 text-white">Best Customers</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index} className="flex items-center mb-2 text-white">
            <img src={bestCustomerImage} alt="Best Customer" className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">{customer.shopName}</span>
            <span className="ml-8">{customer.orderCount} Orders</span> {/* Adjusted margin */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestCustomers;
