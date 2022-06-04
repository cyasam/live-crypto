import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { io } from 'socket.io-client';
import useSWR from 'swr';
import axios from 'axios';

import CoinTable from './components/CoinTable';

const socket = io('/', {
  path: '/socket',
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const processAllData = (assets, changes) => {
  return assets.map((asset) => {
    if (!asset.price24hUsd || !changes) {
      const difference =
        (Number(asset.changePercent24Hr) * Number(asset.priceUsd)) / 100;
      asset.price24hUsd = Number(asset.priceUsd) - difference;
    }

    if (changes) {
      const newPrice = changes[asset.id];

      if (newPrice) {
        asset.priceUsd = newPrice;
        asset.changePercent24Hr =
          ((Number(asset.priceUsd) - asset.price24hUsd) / asset.price24hUsd) *
          100;
      }
    }

    return asset;
  });
};

function App() {
  const [assetsResult, setAssetsResult] = useState(null);
  const { error } = useSWR('/api/assets', fetcher, {
    refreshInterval: 60 * 1000,
    revalidateOnFocus: false,
    onSuccess(assets) {
      const newAssets = processAllData(assets.data);
      setAssetsResult(newAssets);
    },
  });

  useEffect(() => {
    socket.on('prices', (changes) => {
      if (assetsResult) {
        const newAssets = processAllData(assetsResult, JSON.parse(changes));
        setAssetsResult(newAssets);
      }
    });
  }, [assetsResult]);

  return (
    <div className={styles.app}>
      {error && <div>failed to load</div>}
      {!assetsResult && <div>loading...</div>}
      {assetsResult && <CoinTable assets={assetsResult} />}
    </div>
  );
}

export default App;
