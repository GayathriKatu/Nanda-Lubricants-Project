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
    return new Promise((resolve, reject) => {
        const q1 = `INSERT INTO retailer (USER_NAME, SHOP_NAME, ADDRESS, CONTACT_NO, ROUTE_NAME, EMAIL_ADDRESS) VALUES (?,?,?,?,?,?)`;

        db.query(q1, [data.username, data.shopName, data.address, data.contactNumber, data.route, data.email], async (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                try {
                    const hashPassword = await bcrypt.hash(data.password, 10);

                    const q2 = `INSERT INTO user_ (USER_TYPE, USER_PW, USER_NAME) VALUES (?,?,?)`;
                    db.query(q2, ['Retailer', hashPassword, data.username], (err, result) => {
                        if (err) {
                            reject(err);
                            console.log(err);
                        } else {
                            resolve('added!');
                        }
                    });
                } catch (error) {
                    reject(error);
                    console.error(error);
                }
            }
        });
    });
};


export const LoginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT USER_ID, USER_TYPE, USER_NAME, USER_PW FROM user_ WHERE USER_NAME = ?', [username], async (err, [user]) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!user) {
                    reject({ message: "Invalid username or password. Please check again." });
                    return;
                }
                const isPasswordMatch = await bcrypt.compare(password, user.USER_PW);
                if (!isPasswordMatch) {
                    reject({ message: "Invalid username or password. Please check again." });
                    return;
                }
                resolve(user);
            });
        } catch (error) {
            reject(error);
        }
    });
};


