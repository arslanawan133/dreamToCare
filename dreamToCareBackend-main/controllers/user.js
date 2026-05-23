import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer'
import UserModal from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password, playerId } = req.body;

  try {
    const oldUser = await UserModal.findOneAndUpdate({ email }, { playerId }, { new: true });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id, playerId: oldUser.playerId }, secret);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, address, cnic, name, playerId } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name, playerId, address, cnic });

    const token = jwt.sign({ email: result.email, id: result._id, playerId: playerId }, secret);
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    let updatedUser;
    const { name, address, cnic } = req.body;
    if (req.user) {
      const result = { ...req.user._doc, name, address, cnic };
      updatedUser = await UserModal.findByIdAndUpdate(req.user._id, result, { new: true });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserModal.findOne({ email });
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: 'taimoorahmed897@gmail.com',
      pass: 'wmpnhobpeylrcfam'
    }
  });
  if (user?.email === email) {
    let resetToken = (Math.random() + 1).toString(36).substring(4).toUpperCase();

    var mailOptions = {
      from: "noreply@dreamtocare.com",
      to: email,
      subject: 'Dream To Care: Password recovery',
      html: `<p>Click on this link to recover your password: <a href="http://localhost:3000/reset-password?token=${resetToken}" target="_blank" >Reset Password</a>. \n Note this is one time link.</p>`,
    };

    UserModal.updateOne({ _id: user._id }, { resetToken }).then(() => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).send({ error })

        } else {
          res.status(200).send({ message: "Please check your email for password recovery." })
        }
      })
    });

  } else {
    res.status(400).send({ message: 'Email does not exist.' })
  }
}

export const checkReset = async (req, res) => {
  const { token } = req.body;
  let result = await UserModal.findOne({ resetToken: token });
  try {
    res.status(200).json({ isValid: !!result?.resetToken });
  } catch (error) {
    res.status(500).json({ isValid: !result?.resetToken });
  }
}

export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  let user = await UserModal.findOneAndUpdate({ resetToken: token }, { "$unset": { resetToken: "" } }, { new: true });
  if (!user) return res.status(400).json({ message: 'Token is invalid.' });
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  try {
    await UserModal.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({ message: 'Password is reset successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  let user = await UserModal.findById(req.user._id);
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid old password.' });
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  try {
    await UserModal.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
