import {Router} from 'express';

import UserCart from '../models/user.cart';

const cartRouter = Router();

cartRouter.get('/:userId',async(req,res)=>{
    const {userId} = req.params;
    try{
        const cart = await UserCart.findOne({userId}).populate('products.productId');
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        res.json(cart);
    }catch(err){
        console.error(err);
    }
});

cartRouter.post('/:userId/addToCart',async(req,res)=>{
    const {userId} = req.params;
    const {productId} = req.body;

    try{
        
    }

})

export default cartRouter;