import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    //filter using category and subCategory
    if (products.length > 0) {
      let copyProducts = products.slice();

      //filtering by category
      copyProducts = copyProducts.filter(
        (product) => product.category === category
      );

      //filtering by sub category
      copyProducts = copyProducts.filter(
        (product) => product.subCategory === subCategory
      );

      setRelatedProduct(copyProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2 '>
        <Title text1='RELATED' text2='PRODUCTS' />
      </div>

      <div className='grid gric-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gird-cols-5 gap-4 gap-y-6'>
        {relatedProduct.map((product) => (
          <ProductItem
            key={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
