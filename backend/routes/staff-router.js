import express from 'express';
import {register,staffDetails, updateStaff, deleteStaffById} from '../controller/staff-controller.js';

const router = express.Router();

router.post('/register', register);
router.get('/list', staffDetails);
router.post('/update', updateStaff);
router.delete('/delete/:staffId', deleteStaffById);

export const staffRoutes = router;