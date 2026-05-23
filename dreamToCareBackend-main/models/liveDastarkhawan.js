import mongoose from 'mongoose';

const dastarKhawanSchema = mongoose.Schema({
  place: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  search: { type: String, required: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('liveDastarKhawan', dastarKhawanSchema);
