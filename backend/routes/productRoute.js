import express from 'express';
import {
  addProduct,
  getAllProducts,
  removeProduct,
  getProduct,
} from '../controllers/productController.js';
// import upload from '../middleware/multer.js';
import multer from 'multer';
import adminAuth from '../middleware/adminAuth.js';
const productRouter = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const imagesUpload = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
]);

productRouter.post('/', adminAuth, imagesUpload, addProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', adminAuth, removeProduct);

export default productRouter;
