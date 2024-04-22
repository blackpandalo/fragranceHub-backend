import express from 'express';
import { register, login, forgotPassword, resetpassword } from '../controllers/auth.js';
import { upload } from '../helpers/multer.js';
import { deleteUser, getAllUser, getOneUser, updateUser } from '../controllers/user.js';

const router = express.Router();

// routes
router.post('/register', upload.single('image'), register)
router.post('/login', login)
router.get("/user", getAllUser)
router.get("/user/:userId",getOneUser )
router.put("/update/:userId", updateUser )
router.delete("/delete/:userId", deleteUser )

// forget password and reset password
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetpassword)

export default router