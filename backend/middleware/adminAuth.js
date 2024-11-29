// middleware where we need admin permission such as removing, adding product

import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // if no token is found
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization header missing' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); // Extract the token after "Bearer "
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.log('Error from adminAuth', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
