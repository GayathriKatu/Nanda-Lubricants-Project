// routes/inquiry-routes.js
import express from 'express';
import { Addinquiry } from '../controller/inquiry-controller.js';

const router = express.Router();

router.post('/add', Addinquiry);

export const inquiryRoutes = router;
