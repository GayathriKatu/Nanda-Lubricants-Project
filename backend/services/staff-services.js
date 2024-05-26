import { db } from '../.env';
import bcrypt from 'bcrypt';

export const Register = async (data) => {
    try {
        const hashPassword = await bcrypt.hash(data.password, 10);

        return new Promise((resolve, reject) => {
            const q2 = `INSERT INTO user_ (USER_TYPE, USER_PW, USER_NAME) VALUES (?,?,?)`;

            db.query(q2, ['Staff', hashPassword, data.username], (err, result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    const userId = result.insertId;

                    const q1 = `INSERT INTO staff (USER_ID, USER_NAME, NAME, STAFF_POSITION, CONTACT_NO) VALUES (?,?,?,?,?)`;

                    db.query(q1, [userId, data.username, data.fullName, 'staff', data.contactNo], (err, result) => {
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

export const AllStaff = () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT STAFF_ID, USER_ID, USER_NAME, NAME, STAFF_POSITION, CONTACT_NO FROM staff`;
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const products = data.map(item => ({
                    staffId: item.STAFF_ID,
                    userId: item.USER_ID,
                    userName: item.USER_NAME,
                    fullName: item.NAME,
                    position: item.STAFF_POSITION,
                    contactNo: item.CONTACT_NO,
                }))
                resolve(products);
            }
        })

    });
}

// export const StaffById = (staffId) => {
//     return new Promise((resolve, reject) => {
//         const q = `
//             SELECT s.STAFF_ID, s.USER_ID, s.USER_NAME, s.NAME, s.STAFF_POSITION, s.CONTACT_NO
//             FROM staff s
//             INNER JOIN user_ u ON u.USER_ID = s.USER_ID
//             WHERE s.STAFF_ID = ?
//         `;
//         db.query(q, [staffId], (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 if (data.length === 0) {
//                     resolve(null);
//                 } else {
//                     const staff = {
//                         staffId: data[0].STAFF_ID,
//                         userId: data[0].USER_ID,
//                         userName: data[0].USER_NAME,
//                         fullName: data[0].NAME,
//                         position: data[0].STAFF_POSITION,
//                         contactNo: data[0].CONTACT_NO,
//                     };
//                     resolve(staff);
//                 }
//             }
//         });
//     });
// }

export const UpdateStaffAndUser = async(data) => {
    const { contactNo, fullName, password, position, staffId, userId, userName } = data;
    const hashPassword = await bcrypt.hash(password,10);

    return new Promise((resolve, reject) => {
        db.beginTransaction(err => {
            if (err) {
                return reject(err);
            }

            let updateUserQuery = `
                UPDATE user_
                SET USER_NAME = ?
            `;
            const queryParams = [userName];

            if (password) {
                updateUserQuery += `, USER_PW = ?`;
                queryParams.push(hashPassword);
            }

            updateUserQuery += ` WHERE USER_ID = ?`;
            queryParams.push(userId);

            db.query(updateUserQuery, queryParams, (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        reject(err);
                    });
                }

                const updateStaffQuery = `
                    UPDATE staff
                    SET USER_NAME = ?, NAME = ?, STAFF_POSITION = ?, CONTACT_NO = ?
                    WHERE STAFF_ID = ?
                `;

                db.query(updateStaffQuery, [userName, fullName, position, contactNo, staffId], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        });
                    }

                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                reject(err);
                            });
                        }
                        resolve({ message: 'Update successful' });
                    });
                });
            });
        });
    });
};

export const deleteStaff = (staffId) => {
    return new Promise((resolve, reject) => {
        const q = `DELETE FROM staff WHERE STAFF_ID = ?`;
        db.query(q, [staffId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
