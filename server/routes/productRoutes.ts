import { getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import express from 'express'

const router = express.Router()

router.get('/',getAllProducts)
router.get('/:id', getProductById)
router.put('/',updateProduct)

export default router;