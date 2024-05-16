import express from 'express';
import {catDetails} from '../controller/category-controller.js';

const router = express.Router();

router.get('/details', catDetails);

export const categoryRoutes = router;