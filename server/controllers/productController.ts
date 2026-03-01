import { Request, Response } from 'express';
import productModel from '../models/product/product';

// get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// add a new product
export const addProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add product", error: err });
    }
}
