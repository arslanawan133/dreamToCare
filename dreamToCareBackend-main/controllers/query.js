import express from 'express';
import mongoose from 'mongoose';
import QueryMessage from '../models/query.js';

const router = express.Router();

export const getQueries = async (req, res) => {
  try {
    const queryMessage = await QueryMessage.find();

    res.status(200).json(queryMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getQuery = async (req, res) => {
  const { id } = req.params;

  try {
    const query = await QueryMessage.findById(id);

    res.status(200).json(query);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createQuery = async (req, res) => {
  const query = req.body;

  const newQueryMessage = new QueryMessage({
    ...query,
    creator: req.user,
    createdAt: new Date().toISOString(),
  });

  try {
    await newQueryMessage.save();

    res.status(201).json(newQueryMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateQuery = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedQuery = { title, category, description, image, creator: req.user, _id: id };

  await QueryMessage.findByIdAndUpdate(id, updatedQuery, { new: true });

  res.json(updatedQuery);
};

export const deleteQuery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await QueryMessage.findByIdAndRemove(id);
  const queryMessage = await QueryMessage.find();

  res.status(200).json(queryMessage);
};

export default router;
