import express from 'express';
import auth from '../middleware/auth.js';
import { getNotification, createNotification, reportPost } from '../controllers/notifications.js';

const router = express.Router();

router.get('/notification', auth, getNotification);
router.post('/notification', auth, createNotification);

router.patch('/report/:type/:id', auth, reportPost);

export default router;
