import express from 'express';
import {
  addToCart,
  updateCart,
  getProductsInCart,
} from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/', authUser, addToCart);
cartRouter.put('/:productId', authUser, updateCart);
cartRouter.get('/', authUser, getProductsInCart);

export default cartRouter;
