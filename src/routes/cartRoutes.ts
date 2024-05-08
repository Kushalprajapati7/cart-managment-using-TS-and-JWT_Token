import { createCart,updateCart,deleteCart,showCart,showCartById,downloadCartPDF } from "../controllers/cartController";
import express from 'express'

const router = express.Router();

router.post('/cart', createCart);
router.put('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart)
router.get('/cart', showCart)
router.get('/cart/:id', showCartById)
router.get('/download-cart/:cartId',downloadCartPDF )

export default router;