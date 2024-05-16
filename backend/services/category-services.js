import {db } from '../.env';

export const getAllCat = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT CATEGORY_ID, CATEGORY_NAME FROM category`;
        
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