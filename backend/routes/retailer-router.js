import express from 'express';
import {retailDetails} from '../controller/retailer-controller.js';

const router = express.Router();

router.get('/details', retailDetails);

export const retailerRoutes = router;