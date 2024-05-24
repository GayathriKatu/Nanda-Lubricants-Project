// routes/inquiry-routes.js
import express from 'express';
import { Addinquiry, inquiryDetails } from '../controller/inquiry-controller.js';

const router = express.Router();

router.post('/add', Addinquiry);
router.get('/details', inquiryDetails);

export const inquiryRoutes = router;
