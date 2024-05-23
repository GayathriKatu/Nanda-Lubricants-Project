import {getAllOrder,addFullOrder} from '../services/order-services.js';

export const orderDetails = async (req,res) => {
    try{
     
     const data = await getAllOrder();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const AddFullOrder = async (req, res) => {
    const orderDetails = req.body;
    try {
        const data = await addFullOrder(orderDetails);
        return res.status(200).json(data);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json('This happens');
        } else {
            return res.status(500).json('Server side error');
        }
    }
};