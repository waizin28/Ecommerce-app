import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempCartData = [];
    for (const prodId in cartItems) {
      for (const prodSize in cartItems[prodId]) {
        if (cartItems[prodId][prodSize] > 0) {
          tempCartData.push({
            _id: prodId,
            size: prodSize,
            quantity: cartItems[prodId][prodSize],
          });
        }
      }
    }
    setCartData(tempCartData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>

      <div>
        {cartData.map((cartProduct) => {
          const productData = products.find(
            (product) => product._id === cartProduct._id
          );

          //   Displaying each product added to cart
          return (
            <div
              key={cartProduct._id}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                {/* Image of product */}
                <img
                  alt={productData.name}
                  src={productData.image[0]}
                  className='w-16 sm:w-20'
                />

                {/* Product Info */}
                <div>
                  <p className='text-xs sm:text-lg font-medium'>
                    {productData.name}
                  </p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                      {cartProduct.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Increment/decrement quantity of product from cart */}
              <input
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type='number'
                min={1}
                defaultValue={cartProduct.quantity}
                // To ensure the quanity under cart icon change too
                onChange={(event) =>
                  event.target.value === '' || event.target.value === '0'
                    ? null
                    : updateQuantity(
                        cartProduct._id,
                        cartProduct.size,
                        Number(event.target.value)
                      )
                }
              />
              {/* Remove product from cart */}
              <img
                onClick={() =>
                  updateQuantity(cartProduct._id, cartProduct.size, 0)
                }
                src={assets.bin_icon}
                alt='bin icon'
                className='w-4 mr-4 cursor-pointer'
              />
            </div>
          );
        })}
      </div>

      {/* Diaply Total Price and CheckOut*/}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
