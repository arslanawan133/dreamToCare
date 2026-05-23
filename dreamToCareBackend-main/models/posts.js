import mongoose from 'mongoose';
import {userSchema} from './user.js';

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  creator: userSchema,
  id: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  reportIds: { type: Array }
});

export default mongoose.model('Donation Posts', postSchema);
