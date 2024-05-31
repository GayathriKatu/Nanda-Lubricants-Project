import {db } from '../.env';

export const getAllOrderD = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT ORDER_ID, PRODUCT_ID, QUANTITY FROM order_details`;
        
        db.query ( q,(err,data) => {
            if(err){
                reject(err);
            }else{
                console.log(data[0]);
                resolve(data[0]);
        
            }
        })

    })
}

export const AddorderService = ( productName, quantity, volume ) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO order_details (PRODUCT_NAME, QUANTITY, VOLUME) VALUES (?, ?, ?)`;

        db.query( q,[productName, quantity, volume ] , (err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve('added!');
            }
        })
    })
}

//best selling products

export const getTop5BestSellingProducts = () => {
    return new Promise((resolve, reject) => {
        const q = `
        SELECT MAX(PRODUCT_NAME) AS PRODUCT_NAME
      FROM order_details
      GROUP BY PRODUCT_ID
      ORDER BY COUNT(PRODUCT_ID) DESC
      LIMIT 5
      `;
  
      db.query(q, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const products = data.map(item => ({
            productName: item.PRODUCT_NAME
          }));
          resolve(products);
        }
      });
    });
  };