import {db } from '../.env';

export const getAllUser = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT USER_ID, USER_TYPE, USER_PW, USER_NAME FROM user_`;
        
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