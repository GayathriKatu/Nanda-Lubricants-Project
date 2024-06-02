import express from 'express';
import { stockDetails, deleteStockById, Addstock, stockOut, reOrder, updateStock, TotalStockCount, TotalInventoryValue,GetUnitPriceByProductAndVolume } from '../controller/stock-controller.js';

const router = express.Router();

router.get('/details', stockDetails);
router.get('/reorder', reOrder);
router.get('/stockout', stockOut); 
router.delete('/delete/:stockId', deleteStockById);
router.post('/add' , Addstock);
router.put('/update', updateStock);
router.get('/totalstock', TotalStockCount);
router.get('/totalstockvalue', TotalInventoryValue);
router.post('/unitPrice', GetUnitPriceByProductAndVolume);

export const stockRoutes = router;
