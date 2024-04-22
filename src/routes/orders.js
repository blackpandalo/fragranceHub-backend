import express from 'express';
import { deleteOrder, getAllOrders, getOrderById, orderStatus, searchOrdersByDate } from '../controllers/orders.js';

const router = express.Router();


router.get('/all',  getAllOrders);
router.get('/:orderId',  getOrderById);
router.get('/search/term',  searchOrdersByDate);
router.delete("/:orderId", deleteOrder)
router.put("/order-status/:orderId", orderStatus)




export default router;