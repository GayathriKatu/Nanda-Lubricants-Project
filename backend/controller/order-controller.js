import {getAllOrder} from '../services/order-services.js';

export const orderDetails = async (req,res) => {
    try{
     
     const data = await getAllOrder();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}