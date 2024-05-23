import express from 'express';
import {userDetails,login} from '../controller/user-controller.js';

const router = express.Router();

router.get('/details', userDetails);
router.post('/login', login);

export const userRoutes = router;
