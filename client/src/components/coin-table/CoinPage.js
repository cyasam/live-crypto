import React, { useEffect } from 'react';
import useSWR from 'swr';
import PercentageArea from '../PercentageArea';
import Price from '../Price';
import SupplyPrice from '../SupplyPrice';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { fetcher, processAllData } from '../../utils';

import styles from './CoinTable.module.css';
import usePriceSocket from '../../hooks/use-price-socket';
import CoinPageLoader from './CoinPageLoader';

function CoinPage({ page, onSuccess, onLoading, onError, limit }) {
  const urlSearchParams = { limit, offset: (page - 1) * limit };

  const params = new URLSearchParams(urlSearchParams);
  const queryString = params.toString();

  const { data: assets, error } = useSWR(
    `/api/assets${queryString && `?${queryString}`}`,
    fetcher,
    {
      refreshInterval: 60 * 1000,
      onSuccess() {
        onSuccess();
      },
    }
  );

  const selectedAssets = assets?.data.map((asset) => asset.id);
  const socketParams = selectedAssets?.join(',') ?? null;

  const { changes } = usePriceSocket(socketParams);

  useEffect(() => {
    !assets && onLoading();
  }, [assets, onLoading]);

  useEffect(() => {
    error && onError();
  }, [error, onError]);

  const newAssets = assets ? processAllData(assets.data, changes) : null;

  if (!newAssets) return <CoinPageLoader />;

  return (
    <>
      {newAssets.map((asset) => {
        const price = asset.priceUsd;
        const changePercent24Hr = asset.changePercent24Hr;

        return (
          <tr className={styles.tbodytr} key={asset.id}>
            <td className={classNames(styles.td, styles.rank)}>{asset.rank}</td>
            <td className={classNames(styles.td, styles.name)}>
              <Link to={`/currencies/${asset.id}`}>
                <div className={styles.nameblock}>
                  <img
                    loading="lazy"
                    src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                    width={30}
                    height={30}
                    alt={asset.name}
                    className={styles.image}
                    onError={(e) => (e.target.src = '../logo.svg')}
                  />
                  <span>{asset.name}</span>
                  <span className={styles.symbol}>{asset.symbol}</span>
                </div>
              </Link>
            </td>
            <td className={classNames(styles.td)}>
              <Price
                key={price}
                value={price}
                changeDirection={asset.changed}
              />
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
