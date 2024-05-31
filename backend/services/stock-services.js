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

export const AddstockService = ( productName, quantity, unitPrice, volume ) => {
    return new Promise ( (resolve,reject) => {
        const q = `INSERT INTO stock (PRODUCT_NAME, QUANTITY, UNIT_PRICE, VOLUME) VALUES (?,?,?,?)`;

        db.query( q,[ productName, quantity, unitPrice, volume] , (err,data) =>{
            if(err){
                reject(err)
            }else{
                resolve('added!');
            }
        })
    })
}

export const getOutofStock = () => {
    return new Promise ( (resolve,reject) => {
        
        const q = `SELECT STOCK_ID, PRODUCT_NAME, VOLUME, QUANTITY, UNIT_PRICE FROM stock WHERE QUANTITY = 0`;
        
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

// Function to get products that need to be reordered
export const getReorderProducts = () => {
    return new Promise((resolve, reject) => {
        const q = `
            SELECT STOCK_ID, PRODUCT_NAME, VOLUME, QUANTITY, UNIT_PRICE
            FROM stock
            WHERE (VOLUME = '1 L' AND QUANTITY <= 400)
               OR (VOLUME = '5 L' AND QUANTITY <= 300)
               OR (VOLUME = '20 L' AND QUANTITY <= 200)
               OR (VOLUME = '210 L' AND QUANTITY <= 50);
        `;
        
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const stock = data.map(item => ({
                    stockId: item.STOCK_ID,
                    product: item.PRODUCT_NAME,
                    volume: item.VOLUME,
                    stock: item.QUANTITY,
                    price: item.UNIT_PRICE
                }));
                resolve(stock);
            }
        });
    });
};


export const updateStockService = (quantity, unitPrice,productName, volume) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE stock     SET  UNIT_PRICE = ? WHERE PRODUCT_NAME = ? AND VOLUME = ?`;
        db.query(q, [ unitPrice, productName, volume], (err, result) => {
            if (err) {
                reject(err);
                return;
            }      
 
            const add = `UPDATE stock SET QUANTITY = QUANTITY + ? WHERE PRODUCT_NAME = ? AND VOLUME = ?`;
            db.query(add, [quantity, productName, volume], (err, result)  => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve("Added");
            })
            
        });
    });
}

//total instock
export const getTotalStockCount = () => {
    return new Promise((resolve, reject) => {
      const q = `SELECT SUM(QUANTITY) AS totalStockCount FROM stock`;
  
      db.query(q, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const totalStockCount = data[0].totalStockCount || 0;
          resolve(totalStockCount);
        }
      });
    });
  };

  //stock value
  export const getTotalInventoryValue = () => {
    return new Promise((resolve, reject) => {
      const q = `
        SELECT SUM(UNIT_PRICE * QUANTITY) AS totalInventoryValue
        FROM stock
      `;
  
      db.query(q, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const totalInventoryValue = data[0].totalInventoryValue || 0;
          resolve({ totalInventoryValue });
        }
      });
    });
  };
  
  