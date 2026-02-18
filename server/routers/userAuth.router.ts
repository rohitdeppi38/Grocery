import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from user router");
    if(!req.body.token){
        return res.status(401).json({message:"Unauthorized"});
    }   
})

router.post('/register',(req,res)=>{
    console.log(req.body);
    res.send("User registered successfully");
})

router.post('/login',(req,res)=>{
    console.log(req.body);
    res.send("User logged in successfully");
})

export default router;