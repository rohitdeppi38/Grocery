import { Request, Response } from 'express';
import UserWishlist from '../models/Users.model/user.wishlist';

// get wishlist for a user
export const getWishlist = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const wishlist = await UserWishlist.findOne({ userId }).populate('products.productId');
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.json(wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// add to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        let wishlist = await UserWishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = await UserWishlist.create({
                userId, products: [{ productId }]
            });
            return res.status(201).json(wishlist);
        }

        const existingProduct = wishlist.products.find(p => p.productId?.toString() === productId);

        if (!existingProduct) {
            wishlist.products.push({ productId });
            await wishlist.save();
        }

        res.json(wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// remove from wishlist
export const removeFromWishlist = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const wishlist = await UserWishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(item => item.productId?.toString() !== productId);

        await wishlist.save();
        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
