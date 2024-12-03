import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((product) => product.bestseller);
    // Only getting 5 best seller product
    setBestSeller(bestProducts.slice(0, 5));
  }, []);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1='BEST' text2='SELLERS' />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
          dolores atque harum neque rem.
        </p>
      </div>

      {/* Showing latest best seller */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((product) => (
          <ProductItem
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
