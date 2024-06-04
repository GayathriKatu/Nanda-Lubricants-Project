import React, { useEffect, useState } from 'react';
import axios from 'axios';
import totalSalesImage from '../Images/Total Sales.png'; // Adjust the path as necessary

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
    <div className="bg-white bg-opacity-10 shadow-lg rounded-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-3xl  text-white mb-4">Total Sales</h2>
        <p className="text-3xl font-semibold text-white">Rs. {totalSales}</p>
      </div>
      <img src={totalSalesImage} alt="Total Sales" className="w-16 h-16 object-contain" />
    </div>
  );
};

export default TotalSales;
