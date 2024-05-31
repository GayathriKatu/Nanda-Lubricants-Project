// src/components/BestRoutes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BestRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchBestRoutes = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/order/toproutes');
        setRoutes(res.data);
      } catch (error) {
        console.error('Error fetching best routes', error);
      }
    };

    fetchBestRoutes();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Best 5 Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>{route.routeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default BestRoutes;
