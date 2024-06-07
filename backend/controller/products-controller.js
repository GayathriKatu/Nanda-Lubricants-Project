import {getAllPro, AddproductService, getAllProNames, getAllMainshop} from '../services/products-services.js';

export const proDetails = async (req,res) => {
    try{
     
     const data = await getAllPro();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const mainshopDetails = async (req,res) => {
    try{
     
     const data = await getAllMainshop();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const proNames = async (req,res) => {
    try{
     
     const data = await getAllProNames();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const Addproduct = async (req,res) => {
    const { productId,productName,description,category }  = req.body;
    console.log(productId,productName,description,category)
    try{
        const data = await  AddproductService(productId,productName,description,category);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json(err.message);
        }else{
            return res.status(500).json('server side error');
        }
    }
}