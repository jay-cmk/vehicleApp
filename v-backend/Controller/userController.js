import bcrypt from 'bcryptjs';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import {sendEmail} from '../utils/sendEmail.js'



// Register a new user
export const registerUser = async (req, res) => {
    try {
      const { fullName, mobileNumber, email, password, address } = req.body;
      console.log("email name",fullName,email)
  
      const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email or mobile number.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        fullName,
        mobileNumber,
        email,
        password: hashedPassword,
        address
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      // Remove password from response
      const { password: pwd, ...userWithoutPassword } = newUser._doc;
  
      res.status(201).json({
        message: 'User registered successfully.',
        token,
        user: userWithoutPassword
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };

// Login user
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      console.log("user=",user)
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      const { password: pwd, ...userWithoutPassword } = user._doc;
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };




export  const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    console.log("token=",token)
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  };

 export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Generate token
  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.tokenExpire = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create reset URL
  const resetUrl = `http://localhost:8081/reset-password/${token}`;

  // Send Email
  await sendEmail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
  });

  res.status(200).json({ message: 'Reset link sent to your email' });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    tokenExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.tokenExpire = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset' });
};

