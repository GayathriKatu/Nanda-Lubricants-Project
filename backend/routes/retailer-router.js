import express from 'express';
import {retailDetails,register,getDetailsByUserId, retailerDetails, retailUsernames} from '../controller/retailer-controller.js';

const router = express.Router();

router.get('/details', retailDetails);
router.post('/register', register);
router.get('/details-by-user', getDetailsByUserId);
router.get('/retailerdetails', retailerDetails);
router.get('/retailerusernames', retailUsernames);
//router.delete('/delete/:retailerId', deleteRetailerById);

export const retailerRoutes = router;