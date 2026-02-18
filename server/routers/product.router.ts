import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from product router");
})

router.post('/add',(req,res)=>{
    console.log(req.body);
    res.send("Product added successfully");
})

export default router;  