import userCart from '../models/Users.model/user.cart';

import { Request, Response } from 'express';


// get cart controller function 

export const getCart = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const cart = await userCart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (err) {
        console.error(err);
    }
}

// add to cart controller function 

export const addToCart = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        let cart = await userCart.findOne({ userId });

        if (!cart) {
            cart = await userCart.create({
                userId, products: [{ productId }]
            });
            return res.json(cart);
        }

        const existingProduct = cart.products.find(p => p.productId?.toString() === productId);

        if (existingProduct && existingProduct.quantity) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//remove to cart control function

export const removeFromCart = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        let cart = await userCart.findOne({ userId });

        const index = cart?.products.findIndex(item => item.productId?.toString() === productId);
        const removalProduct = cart?.products[index]


        removalProduct.quantity === 1
            ? cart.products.splice(index, 1)
            : removalProduct.quantity -= 1;


        cart?.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
}