import '../env';
import express from 'express';
import axios from 'axios';
import assetsRoute from './assets';
import chatRoute from './chat';
import authRoute from './auth';

export const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
});

const router = express.Router();

router.use('/auth', authRoute);
router.use('/assets', assetsRoute);
router.use('/chat', chatRoute);

router.get('/', (req, res) => {
  res.send('API works.');
});

router.get('*', (req, res) => {
  res.send('Not Found.');
});

export default router;
