import {getAllUser} from '../services/user-services.js';

export const userDetails = async (req,res) => {
    try{
     
     const data = await getAllUser();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}