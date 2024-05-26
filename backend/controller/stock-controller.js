import {getAllStock, getReorderProducts} from '../services/stock-services.js';
import { deleteStock , 
         AddstockService, getOutofStock,
         updateStockService } from '../services/stock-services.js';

export const stockDetails = async (req,res) => {
    try{
     
     const data = await getAllStock();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const deleteStockById = async (req, res) => {
    try {
        const { stockId } = req.params;
        await deleteStock(stockId);
        res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const Addstock = async (req,res) => {
    const { productName, quantity, unitPrice, volume }  = req.body;
    console.log(productName, quantity, unitPrice, volume)
    try{
        const data = await  AddstockService(productName, quantity, unitPrice, volume);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json('meke tiyee');
        }else{
            return res.status(500).json('server side error');
        }
    }
}

export const stockOut = async (req,res) => {
    try{
     
     const data = await getOutofStock();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const reOrder = async (req,res) => {
    try{
     
     const data = await getReorderProducts();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const updateStock = async (req,res) => {
    const {quantity, unitPrice,productName, volume} = req.body;
    try{
        const data = await updateStockService(quantity, unitPrice,productName, volume);
        return res.status(200).json(data);

    
}catch(err){
    return res.status(500).json(err.message);
}}