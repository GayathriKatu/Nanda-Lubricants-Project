import {db } from '../.env';

export const getAllPro = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT PRODUCT_ID, PRODUCT_NAME, P_DESCRIPTION,UNIT_PRICE FROM products`;
        
        db.query ( q,(err,data) => {
            if(err){
                reject(err);
            }else{
                const products = data.map (item => ({
                    productId : item.PRODUCT_ID,
                    productName : item. PRODUCT_NAME,
                    productDes : item.P_DESCRIPTION,
                    unitPrice : item.UNIT_PRICE
                }))
                resolve(products);
            }
        })

    })
}



export const getAllMainshop = () => {
    return new Promise((resolve, reject) => {
      const q = `
        SELECT p.PRODUCT_ID, p.PRODUCT_NAME, p.P_DESCRIPTION, s.VOLUME, s.UNIT_PRICE, c.CATEGORY_NAME
        FROM products p
        JOIN stock s ON p.PRODUCT_NAME = s.PRODUCT_NAME
        JOIN category c ON p.CATEGORY_ID = c.CATEGORY_ID
      `;
  
      db.query(q, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const products = data.reduce((acc, item) => {
            const { PRODUCT_ID, PRODUCT_NAME, P_DESCRIPTION, VOLUME, UNIT_PRICE, CATEGORY_NAME } = item;
  
            if (!acc[PRODUCT_ID]) {
              acc[PRODUCT_ID] = {
                productId: PRODUCT_ID,
                productName: PRODUCT_NAME,
                productDes: P_DESCRIPTION,
                category: CATEGORY_NAME,
                unitPrices: {}
              };
            }
  
            acc[PRODUCT_ID].unitPrices[VOLUME] = UNIT_PRICE;
  
            return acc;
          }, {});
  
          resolve(Object.values(products));
        }
      });
    });
  };
  

export const getAllProNames = () => {
    return new Promise((resolve, reject) => {
        
        const q = `SELECT PRODUCT_NAME FROM products`;
        
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const productNames = data.map(item => item.PRODUCT_NAME);
                resolve(productNames);
            }
        });

    });
};

export const AddproductService = ( productId,productName,description, category ) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO products (PRODUCT_ID, PRODUCT_NAME, P_DESCRIPTION, CATEGORY_ID) VALUES (?,?,?,?)`;

        db.query( q,[ productId,productName,description, category ] , (err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve('added!');
            }
        })
    })
}


// export const AddproductService = (productId, productName, description, unitPrice, category) => {
//     return new Promise((resolve, reject) => {
//         // Query to check if the product name already exists
//         const checkQuery = `SELECT * FROM products WHERE PRODUCT_NAME = ?`;

//         db.query(checkQuery, [productName], (checkErr, checkData) => {
//             if (checkErr) {
//                 reject(checkErr);
//             } else {
//                 if (checkData.length > 0) {
//                     // Product name already exists
//                     reject(new Error('Product name already exists!'));
//                 } else {
//                     // Product name does not exist, proceed with the insertion
//                     const insertQuery = `INSERT INTO products (PRODUCT_ID, PRODUCT_NAME, P_DESCRIPTION, UNIT_PRICE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?)`;

//                     db.query(insertQuery, [productId, productName, description, unitPrice, category], (insertErr, insertData) => {
//                         if (insertErr) {
//                             reject(insertErr);
//                         } else {
//                             resolve('Product added successfully!');
//                         }
//                     });
//                 }
//             }
//         });
//     });
// };
