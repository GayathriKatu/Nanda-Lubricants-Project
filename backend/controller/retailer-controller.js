import {getAllRetail} from '../services/retailer-services.js';

export const retailDetails = async (req,res) => {
    try{
     
     const data = await getAllRetail();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}