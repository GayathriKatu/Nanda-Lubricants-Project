import {db } from '../.env';

// export const getAllOrder = () => {
//     return new Promise ( (resolve,reject) => {
        
//         const q = `SELECT o.ORDER_ID, o.DATE_PLACED, o.TOTAL_VALUE, r.SHOP_NAME, r.ROUTE_NAME
//         FROM order_ o
//         JOIN retailer r ON o.RETAILER_ID = r.RETAILER_ID `;
        
//         db.query ( q,(err,data) => {
//             if(err){
//                 reject(err);
//             }else{
//                 const delivery = data.map (item => ({
//                     orderId: item.ORDER_ID,
//                     datePlaced: item.DATE_PLACED,
//                     totalPrice: item.TOTAL_VALUE,
//                     shopName: item.SHOP_NAME,
//                     routeName: item.ROUTE_NAME
//                 }))
//                 resolve(delivery);
//             }
//         });
//     });
// }

export const getAllOrder = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT o.ORDER_ID, o.DATE_PLACED, o.TOTAL_VALUE, r.SHOP_NAME, r.ROUTE_NAME, 
                   od.ORDER_DETAIL_ID, od.PRODUCT_NAME, od.VOLUME, od.QUANTITY
            FROM order_ o
            JOIN retailer r ON o.RETAILER_ID = r.RETAILER_ID
            LEFT JOIN order_details od ON o.ORDER_ID = od.ORDER_ID
        `;

        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const orders = {};

                data.forEach(item => {
                    if (!orders[item.ORDER_ID]) {
                        orders[item.ORDER_ID] = {
                            orderId: item.ORDER_ID,
                            datePlaced: item.DATE_PLACED,
                            totalPrice: item.TOTAL_VALUE,
                            shopName: item.SHOP_NAME,
                            routeName: item.ROUTE_NAME,
                            details: []
                        };
                    }
                    if (item.ORDER_DETAIL_ID) {
                        orders[item.ORDER_ID].details.push({
                            orderDetailId: item.ORDER_DETAIL_ID,
                            productName: item.PRODUCT_NAME,
                            volume: item.VOLUME,
                            quantity: item.QUANTITY
                        });
                    }
                });

                resolve(Object.values(orders));
            }
        });
    });
};


export const addFullOrder = async (orderDetails) => {
    const datePlaced = new Date().toISOString().split('T')[0];
    return new Promise((resolve, reject) => {
        try {
            db.beginTransaction(async (err) => {
                if (err) {
                    throw err;
                }
                const user = orderDetails[0].user;
                const retailer = await getRetailerId(user);
                let totalValue = 0;

                orderDetails.forEach(detail => {
                    totalValue += detail.unitPrice * detail.quantity;
                });

                db.query('INSERT INTO order_ (RETAILER_ID, DATE_PLACED, TOTAL_VALUE, ORDER_STATUS) VALUES (?, ?, ?, ?)', [retailer, datePlaced, totalValue, 'Pending'], async (err, results) => {
                    if (err) {
                        throw err;
                    }
                    const orderId = results.insertId;

                    for (const detail of orderDetails) {
                        const { quantity, volume, product, pid, unitPrice } = detail;
                        await new Promise((resolve, reject) => {
                            db.query('INSERT INTO order_details (ORDER_ID, QUANTITY, VOLUME, PRODUCT_NAME, PRODUCT_ID, UNIT_PRICE) VALUES (?, ?, ?, ?, ?, ?)', [orderId, quantity, volume, product, pid, unitPrice], async (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    try {
                                        await updateStockQuantity(product,volume, quantity);
                                        resolve();
                                    } catch (updateErr) {
                                        reject(updateErr);
                                    }
                                }
                            });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        resolve({ message: 'Order placed successfully', orderId });
                    });
                });
            });
        } catch (err) {
            db.rollback(() => {
                console.error(err);
                reject(new Error('Internal server error'));
            });
        }
    });
};

const updateStockQuantity = async (productName,volume,orderedQuantity) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE stock SET QUANTITY = QUANTITY - ? WHERE PRODUCT_NAME = ? AND VOLUME = ?', [orderedQuantity, productName, volume], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const getRetailerId = async (userId) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(userId);
            const query = `SELECT RETAILER_ID FROM retailer WHERE USER_ID = ?`;
            db.query(query, [userId], (error, rows) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                } else {
                    if (rows.length > 0) {
                        console.log("rr "+rows[0].RETAILER_ID);
                        resolve(rows[0].RETAILER_ID);
                    } else {
                        reject(new Error('Retailer not found'));
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching details:', error);
            reject(error);
        }
    });
}


//Total sales

export const getTotalSalesThisMonth = () => {
  return new Promise((resolve, reject) => {
    // Get the first day of the current month
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const firstDayFormatted = firstDayOfMonth.toISOString().split('T')[0];

    // Get the last day of the current month
    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    const lastDayFormatted = lastDayOfMonth.toISOString().split('T')[0];

    const q = `SELECT SUM(TOTAL_VALUE) AS totalSales
               FROM order_
               WHERE DATE_PLACED >= ? AND DATE_PLACED <= ?`;

    db.query(q, [firstDayFormatted, lastDayFormatted], (err, data) => {
      if (err) {
        reject(err);
      } else {
        const totalSales = data[0]?.totalSales || 0;
        resolve(totalSales);
      }
    });
  });
};

//best customers

export const getTop5Customers = () => {
    return new Promise((resolve, reject) => {
      const q = `
        SELECT o.RETAILER_ID, COUNT(o.RETAILER_ID) AS orderCount, r.SHOP_NAME
        FROM order_ o
        INNER JOIN retailer r ON o.RETAILER_ID = r.RETAILER_ID
        GROUP BY o.RETAILER_ID
        ORDER BY orderCount DESC
        LIMIT 5
      `;
  
      db.query(q, (err, data) => {
        if (err) {
          reject(err);
        } else {
            const customers = data.map (item => ({
                retailerId : item.RETAILER_ID,
                orderCount : item.orderCount,
                shopName : item.SHOP_NAME
            }))
            resolve(customers);
        }
      });
    });
};


// top routes

export const getTop5Routes = () => {
  return new Promise((resolve, reject) => {
    const q = `
      SELECT DISTINCT r.ROUTE_NAME
      FROM order_ o
      INNER JOIN retailer r ON o.RETAILER_ID = r.RETAILER_ID
      LIMIT 5
    `;

    db.query(q, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const routes = data.map(item => ({
          routeName: item.ROUTE_NAME
        }));
        resolve(routes);
      }
    });
  });
};





