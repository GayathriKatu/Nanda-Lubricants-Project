import express from 'express';
import {proDetails,Addproduct} from '../controller/products-controller.js';

const router = express.Router();

router.get('/details', proDetails);
router.post('/add' , Addproduct);

export const productsRoutes = router;