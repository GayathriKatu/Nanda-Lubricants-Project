import express from 'express';
import { stockDetails, deleteStockById, Addstock, stockOut, reOrder } from '../controller/stock-controller.js';

const router = express.Router();

router.get('/details', stockDetails);
router.get('/reorder', reOrder);
router.get('/stockout', stockOut); 
router.delete('/delete/:stockId', deleteStockById);
router.post('/add' , Addstock);

export const stockRoutes = router;
