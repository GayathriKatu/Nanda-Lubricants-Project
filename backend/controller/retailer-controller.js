import {getAllRetail,Register,LoginUser} from '../services/retailer-services.js';

export const retailDetails = async (req,res) => {
    try{
     
     const data = await getAllRetail();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const register = async (req,res) => {
    try {
        const registerData = req.body
        if(registerData.password === registerData.confirmPassword) {
            const data = await Register(req.body);
            res.json(data);
        } else {
            return res.status(400).json({ message: "Password not match" })
        }
    } catch(err) {
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
