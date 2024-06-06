// routes/inquiry-routes.js
import express from 'express';
import { Addinquiry, inquiryDetails, deleteInquiryById } from '../controller/inquiry-controller.js';

const router = express.Router();

router.post('/add', Addinquiry);
router.get('/details', inquiryDetails);
router.delete('/delete/:inquiryId', deleteInquiryById);

export const inquiryRoutes = router;
