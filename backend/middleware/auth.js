// authenticate user when use do something to cart, place order

import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not Authorized Login Again' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length); // Extract the token after "Bearer "
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    // get user id
    req.body.userId = decoded_token.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authUser;
