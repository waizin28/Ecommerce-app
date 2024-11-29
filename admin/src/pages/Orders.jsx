import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/orders/${orderId}`,
        {
          status: event.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            <img className='w-12' src={assets.parcel_icon} alt='Parcel Icon' />
            <div>
              <div>
                {order.items.map((item, index) => {
                  // item is the last item
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className='py-0.5'>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className='py-0.5'>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>

              {/* Name */}
              <p className='pt-3 font-medium mb-2'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>

              {/* Address */}
              <div>
                <p>{order.address.street + ', '}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </p>
              </div>

              {/* Phone */}
              <p>{order.address.phone}</p>
            </div>

            {/* Order Details */}
            <div>
              <p className='text-sm sm:text-[15px]'>
                Items : {order.items.length}
              </p>
              <p className='mt-3'>Payment Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>
                Date:{' '}
                {new Date(order.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <p className='text-sm sm:text-[15px]'>
              {currency}
              {order.amount}
            </p>
            {/* Order Status */}
            <select
              className='p-2 font-semibold'
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
            >
              <option value='OrderPlaced'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
