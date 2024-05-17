import {getAllOrderD, AddorderService} from '../services/orderD-services.js';

export const orderDDetails = async (req,res) => {
    try{
     
     const data = await getAllOrderD();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const AddOrder = async (req,res) => {
    const {quantity, volume }  = req.body;
    console.log(quantity, volume)
    try{
        const data = await  AddorderService(quantity, volume);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json('meke tiyee');
        }else{
            return res.status(500).json('server side error');
        }
    }
}