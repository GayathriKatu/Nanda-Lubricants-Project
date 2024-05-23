import {getAllUser,LoginUser} from '../services/user-services.js';

export const userDetails = async (req,res) => {
    try{
     
     const data = await getAllUser();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user  = await LoginUser(username, password);
        res.status(200).json({user:user.USER_ID,name:user.USER_TYPE});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};