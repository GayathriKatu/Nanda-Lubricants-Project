import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Total Inventory</h2>
      <p className="text-2xl">{totalInventory}</p>
    </div>
  );
};

export default TotalInventory;
