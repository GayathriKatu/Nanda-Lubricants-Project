import express from 'express';
import {register,staffDetails, updateStaff} from '../controller/staff-controller.js';

const router = express.Router();

router.post('/register', register);
router.get('/list', staffDetails);
router.post('/update', updateStaff);

export const staffRoutes = router;