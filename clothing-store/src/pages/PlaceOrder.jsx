import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { navigate } = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side - User Devliver Information */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1='DELIVERy' text2='INFORMATION' />
        </div>

        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='First Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input
            type='text'
            placeholder='Last Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>
        {/* Email */}
        <input
          type='email'
          placeholder='Email Address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />
        {/* Street */}
        <input
          type='text'
          placeholder='Street'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />

        {/* City and State */}
        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input
            type='text'
            placeholder='State'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>

        {/* Zipcode and Country */}
        <div className='flex gap-3'>
          <input
            type='number'
            placeholder='Zipcode'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
          <input
            type='text'
            placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          />
        </div>

        {/* Phone Number */}
        <input
          type='number'
          placeholder='Phone'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
        />
      </div>

      {/* Right Side - Payment and Deliver Methods */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1='PAYMENT' text2='METHOD' />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row '>
            {/* Stipe */}
            <div
              onClick={() => setPaymentMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'stripe' ? 'bg-green-400 ' : ''
                }`}
              ></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' />
            </div>

            {/* Razor Pay */}
            <div
              onClick={() => setPaymentMethod('razorpay')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'razorpay' ? 'bg-green-400 ' : ''
                }`}
              ></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' />
            </div>

            {/* Cash On Delivery */}
            <div
              onClick={() => setPaymentMethod('cash')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'cash' ? 'bg-green-400 ' : ''
                }`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* Place order btn -> navigate to order page */}
          <div className='w-full text-end mt-8'>
            <button
              className='bg-black text-white px-16 py-3 text-sm'
              onClick={() => navigate('/orders')}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
