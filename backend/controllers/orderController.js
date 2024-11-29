import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

// global variables
const currency = 'usd';
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// PLacing orders using COD (Cash on Delivery)
const placeOrder = async (req, res) => {
  try {
    // note -> userId will come from auth middleware
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address: address,
      paymentMethod: 'COD',
      payment: false,
      date: new Date().toLocaleDateString('en-US'),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // clear cart data
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.status(200).json({ success: true, message: 'Order Placed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Placing order using Stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { originurl } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address: address,
      paymentMethod: 'Stripe',
      payment: false,
      date: new Date().toLocaleDateString('en-US'),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, //converting to cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${originurl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${originurl}/verify?success=false&orderId=${newOrder._id}`,
      mode: 'payment',
      line_items,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// verify stripe payment
const verifyStripePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });
      res.status(200).json({ success: true, message: 'Payment Successful' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Place order using Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const singaporeDollar = 'SGD';

    const orderData = {
      userId,
      items,
      amount,
      address: address,
      paymentMethod: 'Razorpay',
      payment: false,
      date: new Date().toLocaleDateString('en-US'),
    };

    const newOrder = new orderModel(orderData);
    //save the order
    await newOrder.save();

    const options = {
      amount: 2000,
      currency: 'USD',
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (order.status === 'paid') {
      // update order
      await orderModel.findByIdAndUpdate(order._id, {
        payment: true,
      });
      // clear cart
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });
      res.status(200).json({ success: true, message: 'Payment Successful' });
    } else {
      res.status(200).json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// All orders data for admin Panel
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// User Order Data for front end
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Order Status from admin panel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      status,
    });
    res.status(200).json({ success: true, message: 'Order Status Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  verifyStripePayment,
  verifyRazorpay,
};
