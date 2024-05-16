import {db } from '../.env';

export const getAllStock = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT STOCK_ID, PRODUCT_NAME, VOLUME, QUANTITY, UNIT_PRICE FROM stock`;
        
        db.query ( q,(err,data) => {
            if(err){
                reject(err);
            }else{
                
                const stock = data.map (item => ({
                    stockId : item.STOCK_ID,
                    product : item. PRODUCT_NAME,
                    volume : item.VOLUME,
                    stock: item.QUANTITY,
                    price : item.UNIT_PRICE
                }))
                resolve(stock);
                
            }
        })

    })
}

export const deleteStock = (stockId) => {
    return new Promise((resolve, reject) => {
        const q = `DELETE FROM stock WHERE STOCK_ID = ?`;
        db.query(q, [stockId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};