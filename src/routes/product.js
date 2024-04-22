import express from 'express';
import { createProduct, deleteProduct, getProductById, getProductBySlug, processPayment, relatedProduct, searchProduct, updateProduct} from '../controllers/product.js';
import { upload } from '../helpers/multer.js';
import { login } from '../controllers/auth.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);
router.get("/:productId", getProductById)
router.get("/slug/:slug", getProductBySlug)
router.put("/update/:productId", upload.array('images', 5), updateProduct)
router.delete("/:productId", deleteProduct)
router.post("/search", searchProduct)
router.get("/related/:productId", relatedProduct)

router.post("/payment", isLoggedIn, processPayment)


export default router;