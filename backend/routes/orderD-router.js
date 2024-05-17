import express from 'express';
import {orderDDetails,AddOrder} from '../controller/orderD-controller.js';

const router = express.Router();

router.get('/details', orderDDetails);
router.post('/add' , AddOrder);

export const orderDRoutes = router;