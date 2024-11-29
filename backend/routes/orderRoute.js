import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  verifyStripePayment,
  verifyRazorpay,
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.get('/', adminAuth, getAllOrders);
orderRouter.put('/:orderId', adminAuth, updateOrderStatus);

// Payment Features
orderRouter.post('/cash', authUser, placeOrder); // COD (Cash on Delivery)
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Features
orderRouter.get('/userorders', authUser, getUserOrders);

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripePayment);
orderRouter.post('/verifyRazorPay', authUser, verifyRazorpay);

export default orderRouter;
