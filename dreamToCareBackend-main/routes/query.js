import express from 'express';
import { createQuery, getQuery, deleteQuery, getQueries, updateQuery } from '../controllers/query.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/query', getQueries);
router.get('/query/:id', getQuery);
router.post('/query', auth, createQuery);
router.patch('/query/:id', auth, updateQuery);
router.delete('/query/:id', auth, deleteQuery);

export default router;
