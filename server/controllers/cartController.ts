import mongoose from 'mongoose';
import { AuthRequest } from '../middlewares/Authentication/user.loginAuth';
import userCart from '../models/Users.model/user.cart';

import { Request, Response } from 'express';


// get cart controller function 

export const getCart = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        const cart = await userCart.findOne({ userId })
        .populate('userId','name email')
        .populate({
            path:'products.productId',
            select:'name price image category unit stock'
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (err) {
        console.error(err);
    }
}

// add to cart controller function 

export const addToCart = async (req: AuthRequest, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = new mongoose.Types.ObjectId(req.userId! as string);
    const { productId } = req.body;

    try {

        let cart = await userCart.findOne({ userId });

        if (!cart) {
            cart = await userCart.create({
                userId,
                products: [{ productId, quantity: 1 }]
            });

            return res.json(cart);
        }

        const existingProduct = cart.products.find(
            p => p.productId?.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();

        res.json(cart);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//remove to cart control function

export const removeFromCart = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    const { productId } = req.body;

    try {
        let cart = await userCart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const index = cart.products.findIndex(item => item.productId?.toString() === productId);

        if (index === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        const removalProduct = cart.products[index];

        if (removalProduct.quantity && removalProduct.quantity === 1) {
            cart.products.splice(index, 1);
        } else if (removalProduct.quantity) {
            removalProduct.quantity -= 1;
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}