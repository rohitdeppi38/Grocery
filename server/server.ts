import express from 'express';
import cors from 'cors'
import userloginRouter from './routers/userAuth.router';
import cartRouter from './routers/cart.router';
import productRouter from './routers/product.router';
import wishListRouter from './routers/wishList.router';
import  dotenv  from 'dotenv';    

const PORT = process.env.PORT;

const app = express();
dotenv.config();    
app.use(express.json());
app.use(cors());

app.use('/api', userloginRouter);
app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);
app.use('/api/wishlist', wishListRouter);

app.get('/', (req, res) => {
    console.log(req.body);
    res.send("Hello from typescript server")
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
function envconfig(): any {
    throw new Error('Function not implemented.');
}

