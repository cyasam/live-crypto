import fs from 'node:fs';
import path from 'node:path';

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON
);

const coinMapFile = path.join(__dirname, './coin_map.json');

export const addAssetsImageUrl = (assets) => {
  let coinMap = fs.readFileSync(coinMapFile, {
    encoding: 'utf8',
    flag: 'r',
  });

  coinMap = JSON.parse(coinMap);

  const results = assets.data.map((asset) => {
    const img_url = coinMap.find(
      (coin) => coin.symbol === asset.symbol
    )?.img_url;

    asset.img_url = img_url;
    return asset;
  });

  return { data: results, timestamp: assets.timestamp };
};

export const addAssetImageUrl = (asset) => {
  let coinMap = fs.readFileSync(coinMapFile, {
    encoding: 'utf8',
    flag: 'r',
  });

  coinMap = JSON.parse(coinMap);

  const img_url = coinMap.find(
    (coin) => coin.symbol === asset.data.symbol
  )?.img_url;
  asset.data.img_url = img_url;

  return asset;
};
