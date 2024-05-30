import express from 'express';
import {proDetails,Addproduct, proNames, mainshopDetails} from '../controller/products-controller.js';

const router = express.Router();

router.get('/details', proDetails);
router.get('/productnames', proNames);
router.post('/add' , Addproduct);
router.get('/mainshopdetails', mainshopDetails);



export const productsRoutes = router;