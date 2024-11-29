import { createContext } from 'react';
import { products } from '../assets/assets';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const deliveryFee = 10;
  const [search, setSearch] = useState('');
  // will conditionally render search bar
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, productSize) => {
    //prevent from adding to cart if user hasn't selected any size
    if (!productSize) {
      toast.error('Please select product size!');
      return;
    }

    // copy of cart item
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      // taking note of order
      if (cartData[itemId][productSize]) {
        cartData[itemId][productSize] += 1;
      } else {
        cartData[itemId][productSize] = 1;
      }
    } else {
      // creating new entry if item hasn't been add to cart before
      cartData[itemId] = {};
      cartData[itemId][productSize] = 1;
    }

    setCartItems(cartData);
  };

  // Show count at nav bar underneath shopping icon
  const getCartCount = () => {
    let totalCount = 0;
    // iterate through product id
    for (const items in cartItems) {
      // iterate through product size
      for (const item in cartItems[items]) {
        try {
          const count = cartItems[items][item];
          if (count > 0) {
            totalCount += count;
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  // calculating total amount added to cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);

      for (const productSize in cartItems[itemId]) {
        try {
          const quantity = cartItems[itemId][productSize];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {}
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
