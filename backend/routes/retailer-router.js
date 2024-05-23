import express from 'express';
import {retailDetails,register} from '../controller/retailer-controller.js';

const router = express.Router();

router.get('/details', retailDetails);
router.post('/register', register);

export const retailerRoutes = router;