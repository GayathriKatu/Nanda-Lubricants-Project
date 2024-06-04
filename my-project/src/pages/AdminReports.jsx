import React from 'react';
import TotalSales from '../Components/TotalSales';
import TotalInventory from '../Components/TotalInventory';
import TotalInventoryValue from '../Components/TotalInventoryValue';
import BestCustomers from '../Components/BestCustomers';
import BestRoutes from '../Components/BestRoutes';
import TopSellingProducts from '../Components/TopSellingProducts';
import InventoryByCategory from '../Components/InventoryByCategory';
import OrderCountByDate from '../Components/OrderCountByDate';

const AdminReports = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-white mt-6">NANDA LUBRICANT DASHBOARD</h1>
      <div className="grid grid-cols-3 gap-6">
        <TotalSales />
        <TotalInventory />
        <TotalInventoryValue />
        <BestCustomers />
        <BestRoutes />
        <TopSellingProducts />
        {/* <InventoryByCategory /> */}
        <OrderCountByDate/>
      </div>
    </div>
  );
};

export default AdminReports;
