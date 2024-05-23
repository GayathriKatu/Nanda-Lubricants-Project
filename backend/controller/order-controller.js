import {getAllOrder,addFullOrder,getOrderPreviewDetails} from '../services/order-services.js';

export const orderDetails = async (req,res) => {
    try{
     
     const data = await getAllOrder();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const AddFullOrder = async (req,res) => {
    const {category, product, quantity, volume, retailer, unitPrice,pid} = req.body
    try{
        const data = await  addFullOrder(category, product, quantity, volume, retailer, unitPrice,pid);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json('this happens');
        }else{
            return res.status(500).json('server side error');
        }
    }
}
export const GetOrderPreviewDetails = async (req,res) => {
    console.log("con");
    try{     
        const data = await getOrderPreviewDetails();
        res.status(200).json(data);
    } catch(err){
        return res.status(500).json(err.message);
    }
}