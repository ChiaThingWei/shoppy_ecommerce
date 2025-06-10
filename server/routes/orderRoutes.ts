import express from 'express'
import { addToOrder, getAllOrder } from '../controllers/orderControllers'


const router = express.Router()

router.post('/', addToOrder)
router.get('/', getAllOrder)

export default router