import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import PercentageArea from './PercentageArea';
import Price from './Price';
import Logo from '../logo.svg';
import SupplyPrice from './SupplyPrice';
import styles from './CoinTable.module.css';
import classNames from 'classnames';
import { io } from 'socket.io-client';

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

const socket = io('/', {
  path: '/socket',
});

function CoinPage({ page, onSuccess, onLoading, limit }) {
  const [changes, setChanges] = useState(null);

  const urlSearchParams = { limit, offset: (page - 1) * limit };

  const params = new URLSearchParams(urlSearchParams);
  const queryString = params.toString();

  const { data: assets, error } = useSWR(
    `/api/assets${queryString && `?${queryString}`}`,
    fetcher,
    {
      refreshInterval: 60 * 1000,
      revalidateOnFocus: false,
      onSuccess() {
        onSuccess();
      },
    }
  );

  useEffect(() => {
    socket.on('prices', (changes) => {
      setChanges(JSON.parse(changes));
    });
  }, []);

  useEffect(() => {
    !assets && onLoading();
  }, [assets, onLoading]);

  if (!assets) {
    return null;
  }

  const newAssets = processAllData(assets.data, changes);

  return (
    <>
      {error && <p>Failed to Load</p>}
      {newAssets.map((asset) => {
        const price = asset.priceUsd;
        const changePercent24Hr = asset.changePercent24Hr;

        const priceTdClassName = classNames(styles.td, {
          [styles.up]: asset.changed === 'up',
          [styles.down]: asset.changed === 'down',
        });

        return (
          <tr className={styles.tbodytr} key={asset.id}>
            <td className={classNames(styles.td, styles.rank)}>{asset.rank}</td>
            <td className={classNames(styles.td, styles.name)}>
              <div className={styles.nameblock}>
                <img
                  loading="lazy"
                  src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                  width={30}
                  height={30}
                  alt={asset.name}
                  className={styles.image}
                  onError={(e) => (e.target.src = Logo)}
                />
                <span>{asset.name}</span>
                <span className={styles.symbol}>{asset.symbol}</span>
              </div>
            </td>
            <td key={price} className={priceTdClassName}>
              <Price value={price} />
            </td>
            <td className={styles.td}>
              <Price value={asset.marketCapUsd} />
            </td>
            <td className={styles.td}>
              <Price value={asset.volumeUsd24Hr} />
            </td>
            <td className={styles.td}>
              <SupplyPrice
                value={asset.supply}
                symbol={asset.symbol}
                max={asset.maxSupply}
              />
            </td>
            <td className={styles.td}>
              <PercentageArea value={changePercent24Hr} />
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default CoinPage;
