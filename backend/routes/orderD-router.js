import express from 'express';
import {orderDDetails,AddOrder, Top5BestSellingProducts} from '../controller/orderD-controller.js';

const router = express.Router();

router.get('/details', orderDDetails);
router.post('/add' , AddOrder);
router.get('/bestsellingproducts' , Top5BestSellingProducts);

export const orderDRoutes = router;