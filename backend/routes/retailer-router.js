import express from 'express';
import {retailDetails,register,getDetailsByUserId} from '../controller/retailer-controller.js';

const router = express.Router();

router.get('/details', retailDetails);
router.post('/register', register);
router.get('/details-by-user', getDetailsByUserId);

export const retailerRoutes = router;