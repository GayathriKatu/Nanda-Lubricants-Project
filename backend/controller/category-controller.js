import {getAllCat} from '../services/category-services.js';

export const catDetails = async (req,res) => {
    try{
     
     const data = await getAllCat();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}