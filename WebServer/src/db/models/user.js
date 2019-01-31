import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  role: { type: String, default: 'client' },
}, {
  collection: 'user',
  timestamps: true,
});

export default mongoose.model('user', userSchema);
