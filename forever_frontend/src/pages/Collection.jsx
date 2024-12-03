import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  //  Method toggled when category is selected, it will add/remove category
  const toggleCategory = (event) => {
    if (category.includes(event.target.value)) {
      // Conditon occurs, when user alreaday selected the category and uncheck
      setCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      // if category not included, add it
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  //  Method toggled when subcategory is selected, it will add/remove category
  const toggleSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      // Conditon occurs, when user alreaday selected the sub category and uncheck
      setSubCategory((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    } else {
      // if sub category not included, add it
      setSubCategory((prev) => [...prev, event.target.value]);
    }
  };

  //   Filtering through category and sub category selected
  const applyFilter = () => {
    // show copy of all the products
    let productsCopy = products.slice();

    // will filter product, if user is using search bar
    if (showSearch && search) {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // we will only filtered if category or subcategory is selected, otherwise return all the products
    if (category.length > 0) {
      // Output matching category
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      // Output sub category
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let productsCopy = filterProducts.slice();
    switch (sortType) {
      // sorting price from lowest to highest
      case 'low-high':
        setFilterProducts(
          productsCopy.sort(
            (product1, product2) => product1.price - product2.price
          )
        );
        break;
      // sorting price from highest to lowest
      case 'high-low':
        setFilterProducts(
          productsCopy.sort(
            (product1, product2) => product2.price - product1.price
          )
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS{' '}
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt='dropdown icon'
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              {/* Men Filter */}
              <input
                type='checkbox'
                className='w-3'
                value={'Men'}
                onChange={toggleCategory}
              />
              Men
            </p>
            {/* Women Filter */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Women'}
                onChange={toggleCategory}
              />
              Women
            </p>

            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Kids'}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Sub Categories filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              {/* Men Filter */}
              <input
                type='checkbox'
                className='w-3'
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            {/* Women Filter */}
            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>

            <p className='flex gap-2'>
              <input
                type='checkbox'
                className='w-3'
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* UI for right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />
          {/* Product sort */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value='relavent'>Sort by: Relavent</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
