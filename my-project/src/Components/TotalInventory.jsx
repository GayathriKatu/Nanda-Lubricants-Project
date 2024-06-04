import React, { useEffect, useState } from 'react';
import axios from 'axios';
import totalSalesImage from '../Images/Total Sales.png';

const TotalInventory = () => {
  const [totalInventory, setTotalInventory] = useState(0);

  useEffect(() => {
    const fetchTotalInventory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/stock/totalstock');
        setTotalInventory(res.data.totalStockCount); // Adjusted to use totalStockCount
      } catch (error) {
        console.error('Error fetching total inventory', error);
      }
    };

    fetchTotalInventory();
  }, []);

  return (
    <div className="bg-white bg-opacity-10 shadow-lg rounded-lg p-6 flex items-center justify-between">
    <div>
      <h2 className="text-3xl text-white mb-4">Total Inventory</h2>
      <p className="text-3xl font-semibold text-white">{totalInventory}</p>
      </div>
      <img src={totalSalesImage} alt="Total Sales" className="w-16 h-16 object-contain" />
    </div>
  );
};

export default TotalInventory;
