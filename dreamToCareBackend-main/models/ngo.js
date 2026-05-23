import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  ngoName: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  playerId: { type: String },
  address: { type: String },
  cnic: { type: String },
  id: { type: String },
});

export default mongoose.model('Ngo', userSchema);
