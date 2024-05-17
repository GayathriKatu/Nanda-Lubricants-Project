import express from 'express';
import cors from 'cors';
import {PORT,db} from './.env';
import {categoryRoutes} from './routes/category-router.js';
import { productsRoutes } from './routes/products-router.js';
import { userRoutes } from './routes/user-router.js';
import { retailerRoutes } from './routes/retailer-router.js';
import { orderRoutes } from './routes/order-router.js';
import { orderDRoutes } from './routes/orderD-router.js';
import { stockRoutes } from './routes/stock-router.js';
import { inquiryRoutes } from './routes/inquiry-router.js';



const app = express();
app.use(cors());

app.use(express.json());

db.connect( (err) => {
    if(err){
        console.error('db error: '+ err.stack);
        return;
    }
    console.log('db working');
})

//meken mokkd wenne
app.use('/api/category', categoryRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/retailer', retailerRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/orderD', orderDRoutes)
app.use('/api/stock', stockRoutes)
app.use('/api/inquiry', inquiryRoutes)





app.listen(PORT, () => {
    console.log(`backend is working on PORT ${PORT}`);
})