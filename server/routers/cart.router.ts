import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from cart router");
});

router.post('/add',(req,res)=>{
    console.log(req.body);
    
    //add to cart logic
    const { productId, quantity } = req.body;

    if(!productId || !quantity) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    //add to cart logic here
});

export default router;