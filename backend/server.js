import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

// Middlewares
// request pass using json
app.use(express.json());
app.use(cors());

// Api endpoints
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => console.log('Server started on port: ' + port));
