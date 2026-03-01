import { Router } from 'express';
import { authMiddleware } from '../middlewares/Authentication/user.loginAuth';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController';

const router = Router();

router.get('/:userId/get', authMiddleware, getWishlist);
router.post('/:userId/add', authMiddleware, addToWishlist);
router.post('/:userId/remove', authMiddleware, removeFromWishlist);

export default router;