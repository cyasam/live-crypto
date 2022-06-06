import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { io } from 'socket.io-client';
import useSWR from 'swr';
import axios from 'axios';

import CoinTable from './components/CoinTable';
import LoadMoreButton from './components/LoadMoreButton';

const socket = io('/', {
  path: '/socket',
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const processAllData = (assets, changes) => {
  return assets.map((asset) => {
    asset.priceUsd = Number(asset.priceUsd);
    asset.changePercent24Hr = Number(asset.changePercent24Hr);

    if (!asset.price24hUsd || !changes) {
      const difference = (asset.changePercent24Hr * asset.priceUsd) / 100;
      asset.price24hUsd = asset.priceUsd - difference;
    }

    if (changes) {
      let newPrice = changes[asset.id];

      if (newPrice) {
        newPrice = Number(newPrice);

        if (newPrice > asset.priceUsd) {
          asset.changed = 'up';
        } else if (newPrice < asset.priceUsd) {
          asset.changed = 'down';
        }

        asset.priceUsd = newPrice;
        asset.changePercent24Hr =
          ((asset.priceUsd - asset.price24hUsd) / asset.price24hUsd) * 100;
      }
    }

    return asset;
  });
};

function App() {
  const [assetsResult, setAssetsResult] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);

  const urlSearchParams = { limit: offset + limit };

  if (loadMore) {
    urlSearchParams.offset = offset;
    urlSearchParams.limit = limit;
  }

  const params = new URLSearchParams(urlSearchParams);
  const queryString = params.toString();

  const { error } = useSWR(
    `/api/assets${queryString && `?${queryString}`}`,
    fetcher,
    {
      refreshInterval: 60 * 1000,
      revalidateOnFocus: false,
      onSuccess(assets) {
        const newAssets = processAllData(assets.data);

        let data = newAssets;
        if (loadMore) {
          data = [...assetsResult, ...newAssets];
        }

        setAssetsResult(data);
        setLoadMore(false);
      },
    }
  );

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
      {!assetsResult && !error && <div>loading...</div>}
      {assetsResult && (
        <div className={styles.container}>
          <CoinTable assets={assetsResult} />
          <LoadMoreButton
            loading={loadMore}
            onClick={(e) => {
              e.preventDefault();

              setLoadMore(true);
              setOffset(offset + limit);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
