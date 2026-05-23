import express from 'express';
import auth from '../middleware/auth.js';
import { getPosts, getPost, createPost, updatePost, deletePost, getReportedPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/donation', getPosts);
router.get('/reported', getReportedPosts);
router.get('/donation/:id', getPost);
router.post('/donation/', auth, createPost);
router.patch('/donation/:id', auth, updatePost);
router.delete('/donation/:id', auth, deletePost);

export default router;
