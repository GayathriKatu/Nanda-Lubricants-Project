import express from 'express';
import { stockDetails, deleteStockById } from '../controller/stock-controller.js';

const router = express.Router();

router.get('/details', stockDetails);
router.delete('/delete/:stockId', deleteStockById); // Define the delete route

export const stockRoutes = router;
