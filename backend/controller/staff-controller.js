import { Register,AllStaff, UpdateStaffAndUser} from '../services/staff-services.js';

export const register = async (req, res) => {
    try {
        const data = await Register(req.body);
        res.json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

export const staffDetails = async (req, res) => {
    try {
        const data = await AllStaff();
        res.json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

export const updateStaff = async (req, res) => {
    try {
        const data = await UpdateStaffAndUser(req.body);
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
}