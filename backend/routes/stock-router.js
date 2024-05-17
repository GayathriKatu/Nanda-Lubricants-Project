import express from 'express';
import { stockDetails, deleteStockById, Addstock } from '../controller/stock-controller.js';

const router = express.Router();

router.get('/details', stockDetails);
router.delete('/delete/:stockId', deleteStockById);
router.post('/add' , Addstock);

export const stockRoutes = router;
