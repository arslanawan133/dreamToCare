import express from 'express';
import auth from '../middleware/auth.js';
import { createLocation, deleteLocation, getLocation, updateLocation } from '../controllers/livedastarkhawan.js';

const router = express.Router();

router.get('/dastarkhawan', auth, getLocation);
router.post('/dastarkhawan', auth, createLocation);
router.patch('/dastarkhawan', auth, updateLocation);
router.delete('/dastarkhawan/:id', auth, deleteLocation);

export default router;
