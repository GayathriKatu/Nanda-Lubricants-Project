import express from 'express';
import {orderDetails} from '../controller/order-controller.js';

const router = express.Router();

router.get('/details', orderDetails);

export const orderRoutes = router;