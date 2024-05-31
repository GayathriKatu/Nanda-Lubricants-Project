import {getAllOrderD, AddorderService, getTop5BestSellingProducts} from '../services/orderD-services.js';

export const orderDDetails = async (req,res) => {
    try{
     
     const data = await getAllOrderD();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const AddOrder = async (req,res) => {
    const {productName, quantity, volume }  = req.body;
    console.log(productName, quantity, volume)
    try{
        const data = await  AddorderService(productName, quantity, volume);
        return res.status(200).json(data);
    }catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            return res.status(409).json('this happens');
        }else{
            return res.status(500).json('server side error');
        }
    }
}

// top selling products
export const Top5BestSellingProducts = async (req, res) => {
    try {
      const data = await getTop5BestSellingProducts();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };