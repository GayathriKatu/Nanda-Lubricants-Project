import {db } from '../.env';

export const getAllRetail = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT RETAILER_ID, USER_NAME, SHOP_NAME, ADDRESS, CONTACT_NO, ROUTE_NAME, BANK_ACC_NO, EMAIL_ADDRESS FROM retailer`;
        
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