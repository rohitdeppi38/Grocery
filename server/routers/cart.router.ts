import { Router } from 'express';
import { authMiddleware } from '../middlewares/Authentication/user.loginAuth';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController';

const cartRouter = Router();

cartRouter.get('/:userId/get', authMiddleware, getCart);
cartRouter.post('/:userId/addToCart', authMiddleware, addToCart);
cartRouter.post('/:userId/removeFromCart', authMiddleware, removeFromCart);

export default cartRouter;