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