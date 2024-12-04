import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
// Display all the orders
const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.get(backendUrl + `/api/orders/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['paymentMethod'] = order.paymentMethod;
            item['payment'] = order.payment;
            item['date'] = order.date;
            allOrderItems.push(item);
          });
        });

        // latest order display on top
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1='MY' text2='ORDERS' />
      </div>

      <div>
        {orderData.map((product, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img
                src={product.image[0]}
                alt='product image'
                className='w-16 sm:w-20'
              />
              <div>
                <p className='sm:text-base font-medium'>{product.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p>
                    {currency}
                    {product.price}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Size: {product.size}</p>
                </div>

                <p className='mt-2'>
                  Date:
                  <span className='text-gray-400'>
                    {new Date(product.date).toDateString()}
                  </span>
                </p>
                <p className='mt-2'>
                  Payment:
                  <span className='text-gray-400'>
                    {' '}
                    {product.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Status -> Tracking */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{product.status}</p>
              </div>
              <button
                className='border px-4 py-2 text-sm font-medium rounded-sm'
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
