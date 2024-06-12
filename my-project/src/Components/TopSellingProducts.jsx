import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bestSellingProductImage from '../Images/Best Selling Product.png'; // Adjust the path as necessary

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
    <div className="bg-white bg-opacity-10 shadow-md rounded p-4">
      <h2 className="text-3xl mb-6 text-white">Top Selling Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="flex items-center mb-2 text-white">
            <img src={bestSellingProductImage} alt="Best Selling Product" className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">{product.productName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
