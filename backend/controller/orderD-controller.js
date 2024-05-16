import {getAllOrderD} from '../services/orderD-services.js';

export const orderDDetails = async (req,res) => {
    try{
     
     const data = await getAllOrderD();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}