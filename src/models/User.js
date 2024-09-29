import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password should be at least 8 characters long'],
    select: false,
  },
  userType: {
    type: String,
    enum: ['user', 'worker'],
    required: [true, 'Please specify user type'],
  },
  services: [{
    type: String,
    enum: ['cleaning', 'laundry', 'carwash', 'carrepair'],
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);