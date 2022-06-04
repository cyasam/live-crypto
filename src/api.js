import './env';
import express from 'express';
import axios from 'axios';
const router = express.Router();

const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
});

const fetchAssets = () => {
  return externalApi.get('/assets');
};

router.get('/assets', async (req, res) => {
  try {
    const { data: assets } = await fetchAssets();
    res.status(200).json(assets);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

export default router;
