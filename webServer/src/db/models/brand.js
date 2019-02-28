import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  filename: String,
}, {
  collection: 'brand',
  timestamps: true,
});

export default mongoose.model('brand', brandSchema);
