import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    
  },
  mobileNumber: {
    type: String,
    match: /^[6-9]\d{9}$/
  },
  email: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    
  }
  ,
  resetToken: String,
  tokenExpire: Date,
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;