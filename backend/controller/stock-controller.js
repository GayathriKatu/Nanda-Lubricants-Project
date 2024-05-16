import {getAllStock} from '../services/stock-services.js';
import { deleteStock } from '../services/stock-services.js';

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