import {getAllPro, AddproductService} from '../services/products-services.js';

export const proDetails = async (req,res) => {
    try{
     
     const data = await getAllPro();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const Addproduct = async (req,res) => {
    const { productId,productName,description,unitPrice }  = req.body;
    console.log(productId,productName,description,unitPrice)
    try{
        const data = await  AddproductService(productId,productName,description,unitPrice);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json('meke tiyee');
        }else{
            return res.status(500).json('server side error');
        }
    }
}