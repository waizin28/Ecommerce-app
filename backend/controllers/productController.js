import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// function for adding new product
const addProduct = async (req, res) => {
  try {
    // get product details from req body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // we will only pass in valid images
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // upload images to cloudinary
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        // Return the image URL from Cloudinary
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes), // convert string to array
      image: imagesUrl,
      date: new Date().toLocaleDateString('en-US'),
    };
    const product = new productModel(productData);
    const savedProduct = await product.save();
    res
      .status(201)
      .json({ success: true, message: 'Product Added', savedProduct });
  } catch (error) {
    console.log('Error at addProduct', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// function to list all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    //cannot delete because product not found
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// function to get single product information
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    // product not found
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addProduct, getAllProducts, removeProduct, getProduct };
