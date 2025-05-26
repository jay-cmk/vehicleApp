import express from 'express';
import {protect, registerUser,loginUser, forgetPassword, resetPassword}  from '../Controller/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/forget-password',forgetPassword);
userRoutes.post('/reset-password', resetPassword);



export default userRoutes;