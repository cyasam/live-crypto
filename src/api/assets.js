import express from 'express';
import { addAssetImageUrl, addAssetsImageUrl } from '../utils';
import { existCache, getCache, setCache } from '../redis';
import { externalApi } from '.';

const router = express.Router();

const setAssets = async (key, result, options) => {
  await setCache(key, result, { EX: 5 * 60, ...options });
};

const fetchAssets = async (query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();
  const url = `/assets${queryString && `?${queryString}`}`;

  const isExistCache = await existCache(url);
  if (isExistCache) {
    return await getCache(url);
  }

  const { data: assets } = await externalApi.get(url);
  const result = addAssetsImageUrl(assets);

  await setAssets(url, result);

  return await getCache(url);
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
  const url = `/assets/${currencyId}`;

  const isExistCache = await existCache(url);
  if (isExistCache) {
    return await getCache(url);
  }

  const { data: asset } = await externalApi.get(url);

  const result = addAssetImageUrl(asset);
  console.log(asset);

  await setAssets(url, result);

  return result;
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

const calculateExpirationTime = (interval) => {
  const period = interval.substr(0, 1);
  const time = parseInt(interval.substr(1, interval.length));

  if (period === 'h') {
    return time * 60 * 60;
  } else if (period === 'd') {
    return time * 24 * 60 * 60;
  }

  return time * 60;
};

const fetchAssetHistoryById = async (currencyId, query) => {
  const params = new URLSearchParams(query);
  const queryString = params.toString();

  const url = `/assets/${currencyId}/history${
    queryString && `?${queryString}`
  }`;

  const isExistCache = await existCache(url);
  if (isExistCache) {
    return await getCache(url);
  }

  const { data: asset } = await externalApi.get(url);

  const expireTime = calculateExpirationTime(query.interval);
  await setAssets(url, asset, { EX: expireTime });

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
