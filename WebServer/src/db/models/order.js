import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: String,
      quantity: Number,
    },
  ],
}, {
  collection: 'order',
  timestamps: true,
});

export default mongoose.model('order', orderSchema);
