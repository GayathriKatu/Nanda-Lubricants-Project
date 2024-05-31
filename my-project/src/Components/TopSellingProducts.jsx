// src/components/TopSellingProducts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/orderD/bestsellingproducts');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching top selling products', error);
      }
    };

    fetchTopSellingProducts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">Top 10 Selling Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
