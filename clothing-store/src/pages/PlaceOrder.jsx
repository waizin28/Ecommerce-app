import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
    deliveryFee,
  } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const productSize in cartItems[itemId]) {
          if (cartItems[itemId][productSize] > 0) {
            let itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = productSize;
              itemInfo.quantity = cartItems[itemId][productSize];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (paymentMethod) {
        case 'COD': {
          const response = await axios.post(
            backendUrl + '/api/orders/cash',
            orderData,
            {
              headers: {
                originurl: window.location.origin,
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }

          break;
        }
        case 'stripe': {
          const response = await axios.post(
            backendUrl + '/api/orders/stripe',
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                originurl: window.location.origin,
              },
            }
          );

          if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'razorpay': {
          const response = await axios.post(
            backendUrl + '/api/orders/razorpay',
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            console.log(response.data.order);
          }

          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
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
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            required
          />
          <input
            type='text'
            placeholder='Last Name'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            required
          />
        </div>
        {/* Email */}
        <input
          type='email'
          placeholder='Email Address'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          required
        />
        {/* Street */}
        <input
          type='text'
          placeholder='Street'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          required
        />

        {/* City and State */}
        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='City'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            required
          />
          <input
            type='text'
            placeholder='State'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            required
          />
        </div>

        {/* Zipcode and Country */}
        <div className='flex gap-3'>
          <input
            type='number'
            placeholder='Zipcode'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            onChange={onChangeHandler}
            name='zipCode'
            value={formData.zipCode}
            required
          />
          <input
            type='text'
            placeholder='Country'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            required
          />
        </div>

        {/* Phone Number */}
        <input
          type='number'
          placeholder='Phone'
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          required
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
              onClick={() => setPaymentMethod('COD')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === 'COD' ? 'bg-green-400 ' : ''
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
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
