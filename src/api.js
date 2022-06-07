import './env';
import express from 'express';
import axios from 'axios';
const router = express.Router();

const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
});

const fetchAssets = (query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  return externalApi.get(`/assets${queryString && `?${queryString}`}`);
};

router.get('/', (req, res) => {
  res.send('API works.');
});

router.get('/assets', async (req, res) => {
  try {
    const { data: assets } = await fetchAssets(req.query);
    res.status(200).json(assets);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('*', (req, res) => {
  res.send('Not Found.');
});

export default router;
