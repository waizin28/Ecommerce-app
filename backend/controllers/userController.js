// logic to create or login user
import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};
// Logic to handle logging in user
const loginUser = async (req, res) => {
  try {
    // get email and password
    const { email, password } = req.body;

    // check if user exists
    const userExists = await userModel.findOne({ email });

    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User does not exist' });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, userExists.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // create token
    const token = createToken(userExists._id);

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logic for user to register/signup
const registerUser = async (req, res) => {
  try {
    // get name, email and passwor from body
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: 'User already exists' });
    }

    //validate email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: 'Please enter a valid email' });
    }

    if (password.length < 8) {
      return res
        .status(401)
        .json({ success: false, message: 'Please enter a strong password' });
    }

    // if everything valid, hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // provide token to login into app
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if email or password doesn't match admin email or password
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
