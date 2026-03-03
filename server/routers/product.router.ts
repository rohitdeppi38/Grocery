import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController";
import { authMiddleware } from "../middlewares/Authentication/user.loginAuth";

const router = Router();

router.get('/', getProducts);

router.post('/add',authMiddleware, addProduct);

export default router;