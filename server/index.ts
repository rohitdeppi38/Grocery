import express from 'express';
import cors from 'cors';
import userloginRouter from './routers/userAuth.router';
import cartRouter from './routers/cart.router';
import productRouter from './routers/product.router';
import wishListRouter from './routers/wishList.router';
import dotenv from 'dotenv';
import connectDB from './config/connectdb';

// Load environment variables FIRST
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userloginRouter);
app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);
app.use('/api/wishlist', wishListRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));