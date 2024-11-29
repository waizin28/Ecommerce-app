import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { currency } from '../App';

const ProductList = ({ token }) => {
  const [productlist, setProductList] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products`);
      if (response.data.success) {
        setProductList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-2 '>
        {/* Product header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Products */}
        {productlist.map((product) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={product._id}
          >
            <img className='w-12' src={product.image[0]} alt='product image' />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency}
              {product.price}
            </p>
            <p
              className='text-right md:text-center cursor-pointer text-lg'
              onClick={() => removeProduct(product._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
