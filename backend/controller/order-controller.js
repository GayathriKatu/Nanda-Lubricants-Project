import {getAllOrder,addFullOrder, getTotalSalesThisMonth, getTop5Customers, getTop5Routes, getOrderCountByDate} from '../services/order-services.js';

export const orderDetails = async (req,res) => {
    try{
     
     const data = await getAllOrder();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const AddFullOrder = async (req, res) => {
    const orderDetails = req.body;
    try {
        const data = await addFullOrder(orderDetails);
        return res.status(200).json(data);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json('This happens');
        } else {
            return res.status(500).json('Server side error');
        }
    }
};

//Total Sales

export const TotalSalesThisMonth = async (req, res) => {
  try {
    const totalSales = await getTotalSalesThisMonth();
    res.json({ totalSales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//best customers

export const Top5Customers = async (req, res) => {
    try {
      const data = await getTop5Customers();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //best routes

  export const Top5Routes = async (req, res) => {
    try {
      const data = await getTop5Routes();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //order line chart
  export const OrderCountByDate = async (req, res) => {
    try {
      const data = await getOrderCountByDate();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
