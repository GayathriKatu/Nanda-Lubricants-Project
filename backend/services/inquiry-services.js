// services/inquiry-services.js
import { db } from '../.env';

export const AddinquiryService = (orderId, description) => {
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO inquiry (ORDER_ID, I_DESCRIPTION, INQUIRY_DATE) VALUES (?, ?, CURDATE())`;

    db.query(q, [orderId, description], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve('Added successfully!');
      }
    });
  });
}
