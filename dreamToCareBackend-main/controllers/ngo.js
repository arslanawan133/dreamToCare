import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import NgoModal from '../models/ngo.js';

const secret = 'test';

export const ngoSignin = async (req, res) => {
  const { email, password, playerId } = req.body;

  try {
    const oldUser = await NgoModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "Ngo doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id, playerId: playerId }, secret);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const ngoSignup = async (req, res) => {
  const { email, password, address, cnic, ngoName, accountHolderName, playerId } = req.body;

  try {
    const oldUser = await NgoModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: 'Ngo already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await NgoModal.create({
      email,
      password: hashedPassword,
      ngoName,
      accountHolderName,
      playerId,
      address,
      cnic,
    });

    const token = jwt.sign({ email: result.email, id: result._id, playerId: playerId }, secret);
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};

export const updateNgo = async (req, res) => {
  try {
    let updateNgo;
    const { ngoName, accountHolderName, address, cnic } = req.body;
    const oldNgo = await NgoModal.findOne({ _id: req.user._id });

    if (oldNgo) {
      const result = { ...oldNgo._doc, ngoName, accountHolderName, address, cnic };
      updateNgo = await NgoModal.findByIdAndUpdate(oldNgo._id, result, { new: true });
    }
    res.status(200).json(updateNgo);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
