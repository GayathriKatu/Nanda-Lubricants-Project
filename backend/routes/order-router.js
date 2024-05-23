import express from 'express';
import {orderDetails,AddFullOrder,GetOrderPreviewDetails} from '../controller/order-controller.js';

const router = express.Router();

router.get('/details', orderDetails);
router.post('/addFullOrder', AddFullOrder);
router.get('/previewDetails', GetOrderPreviewDetails);

export const orderRoutes = router;