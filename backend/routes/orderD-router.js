import express from 'express';
import {orderDDetails} from '../controller/orderD-controller.js';

const router = express.Router();

router.get('/details', orderDDetails);

export const orderDRoutes = router;