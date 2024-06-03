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

  const dates = orderData.map(item => item.date);
  const counts = orderData.map(item => item.orderCount);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Order Count by Date',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Order Count by Date (Last 14 Days)</h2>
      <LineChart chartData={chartData} />
    </div>
  );
};

export default OrderCountByDate;
