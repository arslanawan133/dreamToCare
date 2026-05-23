import express from 'express';
const router = express.Router();
import { changePassword, checkReset, forgotPassword, resetPassword, signin, signup, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgot-password', forgotPassword);
router.post('/check-request', checkReset);
router.post('/reset-password', resetPassword);
router.post('/change-password', auth, changePassword);
router.patch('/updateUser', auth, updateUser);

export default router;
