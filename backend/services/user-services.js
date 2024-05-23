import {db } from '../.env';
import bcrypt from 'bcrypt';

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