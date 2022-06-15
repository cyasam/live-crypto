import express from 'express';
import { addAssetImageUrl, addAssetsImageUrl } from '../utils';
import { externalApi } from '.';

const router = express.Router();

const fetchAssets = async (query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  const { data: assets } = await externalApi.get(
    `/assets${queryString && `?${queryString}`}`
  );

  return addAssetsImageUrl(assets);
};

router.get('/', async (req, res) => {
  try {
    const assets = await fetchAssets(req.query);

    res.status(200).json(assets);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const fetchAssetById = async (currencyId) => {
  const { data: asset } = await externalApi.get(`/assets/${currencyId}`);

  return addAssetImageUrl(asset);
};

router.get('/:currencyId', async (req, res) => {
  try {
    const asset = await fetchAssetById(req.params.currencyId);

    res.status(200).json(asset);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const fetchAssetHistoryById = async (currencyId, query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  const { data: asset } = await externalApi.get(
    `/assets/${currencyId}/history${queryString && `?${queryString}`}`
  );

  return asset;
};

router.get('/:currencyId/history', async (req, res) => {
  try {
    const asset = await fetchAssetHistoryById(req.params.currencyId, req.query);
    res.status(200).json(asset);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
