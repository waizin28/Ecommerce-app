import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      // more secure way to verifying is using web hook
      const response = await axios.post(
        backendUrl + '/api/orders/verifyStripe',
        {
          success,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        // navigate back to cart back to try again
        console.log('Going back');
        navigate('/cart');
      }
    } catch (error) {
      console.log('Error verifying payment:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
