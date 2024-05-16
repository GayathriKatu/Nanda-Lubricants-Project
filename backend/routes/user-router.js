import express from 'express';
import {userDetails} from '../controller/user-controller.js';

const router = express.Router();

router.get('/details', userDetails);

export const userRoutes = router;
