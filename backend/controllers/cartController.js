import userModel from '../models/userModel.js';
// add products to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, productSize } = req.body;

    // get user data
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][productSize]) {
        cartData[itemId][productSize] += 1;
      } else {
        cartData[itemId][productSize] = 1;
      }
    } else {
      // no product with this productId
      cartData[itemId] = {};
      cartData[itemId][productSize] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.status(200).json({ success: true, message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, productSize, quantity } = req.body;

    // get user data
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    // update cart data
    cartData[productId][productSize] = quantity;
    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });
    res
      .status(200)
      .json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// get prducts in cart
const getProductsInCart = async (req, res) => {
  try {
    const { userId } = req.body;
    // get user data
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addToCart, updateCart, getProductsInCart };
