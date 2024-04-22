import express from 'express';
import { createCategory, createCategoryById, createCategoryBySlug, deleteCategory, updateCategory } from '../controllers/category.js';
import { isAdmin, isLoggedIn } from '../middlewares/auth.js';

const router = express.Router()

// const cat = (req, res, next)=>{
//     console.log("auth middleware activated");
//     next()
// }

router.post("/create", isLoggedIn, isAdmin, createCategory)
router.get("/:productId", createCategoryById)
router.get("/slug/:slug", createCategoryBySlug)
router.put("/update/:productId", updateCategory)
router.delete("/:productId", deleteCategory)






export default router