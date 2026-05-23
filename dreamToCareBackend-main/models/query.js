import mongoose from 'mongoose';
import {userSchema} from './user.js';

const querySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  creator: userSchema,
  id: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  reportIds: { type: Array }
});

export default mongoose.model('Query Posts', querySchema);
