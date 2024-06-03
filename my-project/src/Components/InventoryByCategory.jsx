// src/components/InventoryByCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart'; // Import the LineChart component

const InventoryByCategory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventoryByCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/inventory/category');
        setInventoryData(res.data);
      } catch (error) {
        console.error('Error fetching inventory by category', error);
      }
    };

    fetchInventoryByCategory();
  }, []);

  const categories = inventoryData.map(item => item.category);
  const values = inventoryData.map(item => item.totalInventory);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Inventory by Category',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Inventory by Category</h2>
      <LineChart chartData={chartData} />
    </div>
  );
};

export default InventoryByCategory;
