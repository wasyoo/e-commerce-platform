import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: Number,
  image: String,
  category: String,
}, {
  collection: 'product',
  timestamps: true,
});

export default mongoose.model('product', productSchema);
