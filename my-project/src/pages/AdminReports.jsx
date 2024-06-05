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
      <h1 className="text-3xl mb-8 text-white mt-6">NANDA LUBRICANT DASHBOARD</h1>
      <div className="grid grid-cols-4 gap-6">
        {/* Left Side (1:3 ratio) */}
        <div className="col-span-1">
          <div className="mb-4"> {/* Add margin-bottom for space */}
            <TotalSales />
          </div>
          <div className="mb-4"> {/* Add margin-bottom for space */}
            <TotalInventory />
          </div>
          <div className="mb-4"> {/* Add margin-bottom for space */}
            <TotalInventoryValue />
          </div>
        </div>

        {/* Right Side (3:1 ratio) */}
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-6">
            {/* First Part of Right Side (1:2 ratio) */}
            <div className="col-span-1">
              <div className="mb-4"> {/* Add margin-bottom for space */}
                <OrderCountByDate />
              </div>
              <div className="mb-4"> {/* Add margin-bottom for space */}
                <BestRoutes />
              </div>
            </div>

            {/* Second Part of Right Side (1:2 ratio) */}
            <div className="col-span-1">
              <div className="mb-4"> {/* Add margin-bottom for space */}
                <BestCustomers />
              </div>
              <div className="mb-4"> {/* Add margin-bottom for space */}
                <TopSellingProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
