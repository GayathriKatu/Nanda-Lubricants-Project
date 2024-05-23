import {db } from '../.env';

export const getAllOrder = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT o.ORDER_ID, o.DATE_PLACED, o.TOTAL_VALUE, r.SHOP_NAME, r.ROUTE_NAME
        FROM order_ o
        JOIN retailer r ON o.RETAILER_ID = r.RETAILER_ID `;
        
        db.query ( q,(err,data) => {
            if(err){
                reject(err);
            }else{
                
                const delivery = data.map (item => ({
                    orderId: item.ORDER_ID,
                    datePlaced: item.DATE_PLACED,
                    totalPrice: item.TOTAL_VALUE,
                    shopName: item.SHOP_NAME,
                    routeName: item.ROUTE_NAME
                }))
                resolve(delivery);
            }
        })

    })
}

export const addFullOrder = async (category, product, quantity, volume, retailer, unitPrice,pid) => {
    const datePlaced = new Date().toISOString().split('T')[0];
    const totalValue = unitPrice * quantity;
    
    return new Promise((resolve, reject) => {
        try {
            db.beginTransaction(async (err) => {
                if (err) {
                    throw err;
                }
                db.query('INSERT INTO order_ (RETAILER_ID, DATE_PLACED, TOTAL_VALUE, ORDER_STATUS) VALUES (?, ?, ?, ?)', [retailer, datePlaced, totalValue, 'Pending'], async (err, results) => {
                    if (err) {
                        throw err;
                    }
                    const orderId = results.insertId;
                    db.query('INSERT INTO order_details (ORDER_ID, QUANTITY, VOLUME, PRODUCT_NAME,PRODUCT_ID,UNIT_PRICE) VALUES (?, ?, ?, ?,?,?)', [orderId, quantity, volume, product,pid,unitPrice], async (err) => {
                        if (err) {
                            throw err;
                        }
                        db.commit((err) => {
                            if (err) {
                                throw err;
                            }
                            resolve({ message: 'Order placed successfully', orderId });
                        });
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

export const getOrderPreviewDetails = async () => {
    console.log("se");
    return new Promise((resolve, reject) => {
        try {
            const query = `
                SELECT order_details.PRODUCT_ID, order_details.PRODUCT_NAME, order_details.VOLUME, order_details.QUANTITY, order_details.UNIT_PRICE, order_.TOTAL_VALUE
                FROM order_
                INNER JOIN order_details ON order_.ORDER_ID = order_details.ORDER_ID
            `;
            db.query(query, (error, rows) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                } else {
                    const orders = rows.map (row => ({
                        productid: row.PRODUCT_ID,
                        productname: row.PRODUCT_NAME,
                        quantity: row.QUANTITY,
                        subtotal: row.TOTAL_VALUE,
                        unitprice: row.UNIT_PRICE,
                        volume: row.VOLUME
                    }))
                    resolve(orders);
                }
            });
        } catch (error) {
            console.error('Error fetching details:', error);
            reject(error);
        }
    });
};




