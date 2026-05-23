import express from 'express';
const router = express.Router();
import { ngoSignin, ngoSignup , updateNgo } from '../controllers/ngo.js';
import auth from '../middleware/auth.js';

router.post('/ngo/signin', ngoSignin);
router.post('/ngo/signup', ngoSignup);
router.patch('/updateNgo', auth, updateNgo);

export default router;
