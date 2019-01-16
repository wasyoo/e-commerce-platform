import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: String,
}, {
  collection: 'category',
  timestamps: true,
});

export default mongoose.model('category', categorySchema);
