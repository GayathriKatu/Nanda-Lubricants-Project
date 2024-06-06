// controller/inquiry-controller.js
import { AddinquiryService, getAllInquiry, deleteInquiry } from '../services/inquiry-services.js';

export const Addinquiry = async (req, res) => {
  const { orderId, description } = req.body;
  console.log(req);
  console.log(orderId, description); // Check if these values are correctly received
  try {
    const data = await AddinquiryService(orderId, description);
    return res.status(200).json(data);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json('Entry already exists');
    } else {
      return res.status(500).json(err.message);
    }
  }
}

export const inquiryDetails = async (req,res) => {
  try{
   
   const data = await getAllInquiry();
   res.json(data);
   
  }catch(err){
      return res.status(500).json(err.message);
  }
}

//delete inquiry
export const deleteInquiryById = async (req, res) => {
  try {
      const { inquiryId } = req.params;
      await deleteInquiry(inquiryId);
      res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};