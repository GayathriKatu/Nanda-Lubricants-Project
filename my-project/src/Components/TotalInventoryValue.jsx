// src/components/TotalInventoryValue.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Total Inventory Value</h2>
      <p className="text-2xl">{totalInventoryValue}</p>
    </div>
  );
};

export default TotalInventoryValue;
