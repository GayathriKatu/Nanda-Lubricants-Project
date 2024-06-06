import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart';

const OrderCountByDate = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderCountByDate = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/order/orderslinechart');
        setOrderData(res.data);
      } catch (error) {
        console.error('Error fetching order count by date', error);
      }
    };

    fetchOrderCountByDate();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  const dates = orderData.map(item => formatDate(item.date));
  const counts = orderData.map(item => item.orderCount);

  const chartData = {
    labels: dates,
    datasets: [
      {
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: '#DEC7A1',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white bg-opacity-10 shadow-md rounded p-4">
      <h2 className="text-3xl text-white mb-4">Number of Orders (Last 14 Days)</h2>
      <div className="h-80"> {/* Adjust the height as needed */}
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
};

export default OrderCountByDate;
