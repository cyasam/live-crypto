import './env';
import express from 'express';
import axios from 'axios';
import { addAssetImageUrl, addAssetsImageUrl } from './utils';

const router = express.Router();

const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
});

const fetchAssets = (query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  return externalApi.get(`/assets${queryString && `?${queryString}`}`);
};

const fetchAssetById = (currencyId) => {
  return externalApi.get(`/assets/${currencyId}`);
};

const fetchAssetHistoryById = (currencyId, query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  return externalApi.get(
    `/assets/${currencyId}/history${queryString && `?${queryString}`}`
  );
};

router.get('/', (req, res) => {
  res.send('API works.');
});

router.get('/assets', async (req, res) => {
  try {
    const { data: assets } = await fetchAssets(req.query);

    const result = addAssetsImageUrl(assets);

    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/assets/:currencyId', async (req, res) => {
  try {
    const { data: asset } = await fetchAssetById(req.params.currencyId);

    const result = addAssetImageUrl(asset);
    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/assets/:currencyId/history', async (req, res) => {
  try {
    const { data: asset } = await fetchAssetHistoryById(
      req.params.currencyId,
      req.query
    );
    res.status(200).json(asset);
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
