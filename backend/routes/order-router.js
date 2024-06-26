import express from 'express';
import {orderDetails,AddFullOrder, TotalSalesThisMonth, Top5Customers, Top5Routes, OrderCountByDate} from '../controller/order-controller.js';

const router = express.Router();

router.get('/details', orderDetails);
router.post('/addFullOrder', AddFullOrder);
router.get('/totalsales', TotalSalesThisMonth);
router.get('/topcustomers', Top5Customers);
router.get('/toproutes', Top5Routes);
router.get('/orderslinechart', OrderCountByDate);


export const orderRoutes = router;