import React, { useEffect, useState } from 'react';
import axios from 'axios';
import totalSalesImage from '../Images/Total Sales.png'; // Adjust the path as necessary

const TotalInventoryValue = () => {
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);

  useEffect(() => {
    const fetchTotalInventoryValue = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/stock/totalstockvalue');
        setTotalInventoryValue(res.data.totalInventoryValue);
      } catch (error) {
        console.error('Error fetching total inventory value', error);
      }
    };

    fetchTotalInventoryValue();
  }, []);

  // Convert totalInventoryValue to millions and format to 2 decimal places
  const totalInventoryValueInMillions = (totalInventoryValue / 1000000).toFixed(2);

  return (
    <div className="bg-white bg-opacity-10 shadow-lg rounded-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-3xl text-white mb-4">Total Inventory Value</h2>
        <p className="text-3xl font-semibold text-white">Rs. {totalInventoryValueInMillions} M</p>
      </div>
      <img src={totalSalesImage} alt="Total Sales" className="w-16 h-16 object-contain" />
    </div>
  );
};

export default TotalInventoryValue;
