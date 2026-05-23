import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/posts.js';
import QueryMessage from '../models/query.js';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReportedPosts = async (req, res) => {
  try {
    const reportedDonations = await PostMessage.find({"reportIds.0": {$exists: true } });
    const reportedQueries = await QueryMessage.find({"reportIds.0": {$exists: true } });
    res.status(200).json({reportedDonations, reportedQueries});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.user,
    createdAt: new Date().toISOString()
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });

  const updatedPost = { title, category, description, image, creator: req.user, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  const postMessages = await PostMessage.find();

  res.status(200).json(postMessages);
};

export default router;
