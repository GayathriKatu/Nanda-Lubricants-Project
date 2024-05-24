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

export const getAllInquiry = () => {
  return new Promise ( (resolve,reject) => {
      
      const q = `SELECT INQUIRY_ID, ORDER_ID, I_DESCRIPTION, INQUIRY_DATE FROM inquiry`;
      
      db.query ( q,(err,data) => {
          if(err){
              reject(err);
          }else{
              
              const inquiry = data.map (item => ({
                  inquiryId : item.INQUIRY_ID,
                  orderId : item. ORDER_ID,
                  description : item.I_DESCRIPTION,
                  inquiryDate : item.INQUIRY_DATE
              }))
              resolve( inquiry );
              
          }
      })

  })
}