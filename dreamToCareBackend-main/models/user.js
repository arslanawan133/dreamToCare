import mongoose from 'mongoose';

export const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  role: { type: String, default: 'user' },
  playerId: { type: String },
  address: { type: String },
  cnic: { type: String },
  id: { type: String },
  resetToken: { type: String, required: false }
});

export default mongoose.model('User', userSchema);
