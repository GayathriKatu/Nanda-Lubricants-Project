import express from 'express';
import {proDetails,Addproduct, proNames} from '../controller/products-controller.js';

const router = express.Router();

router.get('/details', proDetails);
router.get('/productnames', proNames);
router.post('/add' , Addproduct);


export const productsRoutes = router;