import mongoose from 'mongoose';
import { userSchema } from './user.js';

const notificationSchema = mongoose.Schema({
  message: { type: String, required: true },
  notificationFor: { type: String },
  id: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Notifications', notificationSchema);
