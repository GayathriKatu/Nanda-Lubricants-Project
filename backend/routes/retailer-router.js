import express from 'express';
import {retailDetails,register,login} from '../controller/retailer-controller.js';

const router = express.Router();

router.get('/details', retailDetails);
router.post('/register', register);
router.post('/login', login);

export const retailerRoutes = router;