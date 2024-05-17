// controller/inquiry-controller.js
import { AddinquiryService } from '../services/inquiry-services.js';

export const Addinquiry = async (req, res) => {
  const { orderId, description } = req.body;
  console.log(orderId, description); // Check if these values are correctly received
  try {
    const data = await AddinquiryService(orderId, description);
    return res.status(200).json(data);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json('Entry already exists');
    } else {
      return res.status(500).json('Server side error');
    }
  }
}
