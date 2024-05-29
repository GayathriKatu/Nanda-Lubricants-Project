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

export const AddproductService = ( productId,productName,description,unitPrice, category ) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO products (PRODUCT_ID, PRODUCT_NAME, P_DESCRIPTION, UNIT_PRICE, CATEGORY_ID) VALUES (?,?,?,?,?)`;

        db.query( q,[ productId,productName,description,unitPrice, category ] , (err,data) =>{
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
