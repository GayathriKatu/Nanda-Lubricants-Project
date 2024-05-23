import {db } from '../.env';
import bcrypt from 'bcrypt';

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

export const Register = async (data) => {
    try {
        const hashPassword = await bcrypt.hash(data.password, 10);
        
        return new Promise((resolve, reject) => {
            const q2 = `INSERT INTO user_ (USER_TYPE, USER_PW, USER_NAME) VALUES (?,?,?)`;

            db.query(q2, ['Retailer', hashPassword, data.username], (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    const userId = result.insertId;

                    const q1 = `INSERT INTO retailer (USER_ID, USER_NAME, SHOP_NAME, ADDRESS, CONTACT_NO, ROUTE_NAME, EMAIL_ADDRESS) VALUES (?,?,?,?,?,?,?)`;

                    db.query(q1, [userId, data.username, data.shopName, data.address, data.contactNumber, data.route, data.email], (err, result) => {
                        if (err) {
                            reject(err);
                            console.log(err);
                        } else {
                            resolve('Added!');
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Internal server error');
    }
};


