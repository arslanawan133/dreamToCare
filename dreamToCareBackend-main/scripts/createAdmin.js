import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Try to load dotenv if available, but continue if it's not installed
try {
  // top-level await is supported in modern Node ESM
  await import('dotenv').then(mod => mod.config()).catch(() => {});
} catch (e) {
  // ignore if dotenv can't be loaded
}
import User from '../models/user.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dreamtocare';

async function run() {
  const [, , email, password, name = 'Admin'] = process.argv;
  if (!email || !password) {
    console.log('Usage: node scripts/createAdmin.js <email> <password> [name]');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.warn('Could not connect to provided MongoDB, starting in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      existing.role = 'admin';
      existing.status = 'admin';
      if (name) existing.name = name;
      await existing.save();
      console.log(`Existing user updated to admin: ${existing._id}`);
    } else {
      const hashed = await bcrypt.hash(password, 12);
      const user = await User.create({ email, password: hashed, name, role: 'admin', status: 'admin' });
      console.log(`Admin user created: ${user._id}`);
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
