import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: String,
      quantity: Number,
    },
  ],
  totalPrice: String,
  totalQuantity: String,
  state: { type: String, default: 'waiting' },
}, {
  collection: 'order',
  timestamps: true,
});

export default mongoose.model('order', orderSchema);
