import {getAllRetail,Register,GetDetailsByUserId, getAllRetailerDetails, getAllRetailUsernames} from '../services/retailer-services.js';

export const retailDetails = async (req,res) => {
    try{
     
     const data = await getAllRetail();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const register = async (req,res) => {
    try {
        const registerData = req.body
        if(registerData.password === registerData.confirmPassword) {
            const data = await Register(req.body);
            res.json(data);
        } else {
            return res.status(400).json({ message: "Password not match" })
        }
    } catch(err) {
        return res.status(500).json(err.message);
    }
}

export const getDetailsByUserId = async (req,res) => {
    try {
        const userId =req.headers.user_id;
        const data = await GetDetailsByUserId(userId);
        res.json(data);

    } catch(err) {
        return res.status(500).json(err.message);
    }
}

// retailer details display
export const retailerDetails = async (req,res) => {
    try{
     
     const data = await getAllRetailerDetails();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
  }

//delete retailer
// export const deleteRetailerById = async (req, res) => {
//     try {
//         const { retailerId } = req.params;
//         await deleteRetailer(retailerId);
//         res.status(200).json({ message: 'Retailer deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
//   };

//username list
export const retailUsernames = async (req,res) => {
    try{
     
     const data = await getAllRetailUsernames();
     res.json(data);
     
    }catch(err){
        return res.status(500).json(err.message);
    }
}