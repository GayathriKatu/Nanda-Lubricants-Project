import express from 'express';
import {orderDetails,AddFullOrder} from '../controller/order-controller.js';

const router = express.Router();

router.get('/details', orderDetails);
router.post('/addFullOrder', AddFullOrder);

export const orderRoutes = router;