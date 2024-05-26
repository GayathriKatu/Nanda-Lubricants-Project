import { Register,AllStaff, UpdateStaffAndUser, deleteStaff} from '../services/staff-services.js';

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

export const deleteStaffById = async (req, res) => {
    try {
        const { staffId } = req.params;
        await deleteStaff(staffId);
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};