// src/components/TotalSales.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/order/totalsales');
        setTotalSales(res.data.totalSales);
      } catch (error) {
        console.error('Error fetching total sales', error);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Total Sales</h2>
      <p className="text-2xl">{totalSales}</p>
    </div>
  );
};

export default TotalSales;
