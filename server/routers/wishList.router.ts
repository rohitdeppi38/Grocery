import {Router} from 'express';

const router = Router();

router.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello from wishlist router");
})

router.post('/add',(req,res)=>{
    console.log(req.body);
    res.send("Item added to wishlist successfully");
})

export default router;