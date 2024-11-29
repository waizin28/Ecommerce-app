import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
// Page to show info about each product
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const fetchProductData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((productImage, index) => (
              <img
                onClick={() => setImage(productImage)}
                src={productImage}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>

          {/* Showing large scale of image */}
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='main image' />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          {/* Product Name */}
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* Showing rating (stars) */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='Star icon' className='w-3' />
            <img src={assets.star_icon} alt='Star icon' className='w-3' />
            <img src={assets.star_icon} alt='Star icon' className='w-3' />
            <img src={assets.star_icon} alt='Star icon' className='w-3' />
            <img src={assets.star_dull_icon} alt='Star icon' className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>

          {/* Price */}
          <p className='mt-5 text-2xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>

          {/* Choose different sizes */}
          <div className='flex flex-col gap-4 my-6'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((size, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === selectedSize ? 'border-orange-500' : ''
                  }`}
                  key={index}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Btn */}
          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on dilivery is avaiable on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            aliquam voluptate perferendis architecto doloribus odio, iste ea
            assumenda!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ut
            cupiditate nobis architecto aut est! Quos eos suscipit adipisci
            reprehenderit asperiores molestias, rerum repellendus accusantium
            eveniet placeat corporis iure ab.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
