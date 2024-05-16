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
                // jnvkjsdvn
            }
        })

    })
}