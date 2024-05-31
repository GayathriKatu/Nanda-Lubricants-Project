import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Best 5 Customers</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>
            {customer.shopName} - {customer.orderCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestCustomers;
