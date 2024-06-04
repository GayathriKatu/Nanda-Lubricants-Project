import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bestRouteImage from '../Images/Best Routes.png'; // Adjust the path as necessary

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
    <div className="bg-white bg-opacity-10 shadow-md rounded p-4">
      <h2 className="text-3xl  mb-6 text-white">Best 5 Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index} className="flex items-center mb-2 text-white">
            <img src={bestRouteImage} alt="Best Route" className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">{route.routeName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestRoutes;
