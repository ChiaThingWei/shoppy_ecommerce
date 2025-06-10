import express from 'express'
import { getCartItems,updateCartItem,deleteCartItem,addToCart } from '../controllers/cartControllers'


const router = express.Router()

router.post('/', addToCart)
router.get('/:userId', getCartItems)
router.put('/:id',updateCartItem)
router.delete('/:id',deleteCartItem)

export default router