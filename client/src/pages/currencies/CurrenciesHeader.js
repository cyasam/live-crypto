import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import PercentageArea from '../../components/PercentageArea';
import Price from '../../components/Price';
import SupplyPrice from '../../components/SupplyPrice';
import LoadingContext from '../../context/LoadingContext';
import usePriceSocket from '../../hooks/use-price-socket';
import { fetcher, processOneData } from '../../utils';
import styles from './CurrenciesHeader.module.css';

function CurrenciesHeader({ currencyId }) {
  const { data: asset, error } = useSWR(`/api/assets/${currencyId}`, fetcher, {
    refreshInterval: 60 * 1000,
  });

  const { setLoadingStatus } = useContext(LoadingContext);
  const { changes } = usePriceSocket(asset?.data.id);

  useEffect(() => {
    setLoadingStatus(!asset ? true : false);
  }, [asset, setLoadingStatus]);

  const currency = asset ? processOneData(asset?.data, changes) : null;

  return (
    <div className={styles.header}>
      {error && <div className={styles.error}>Failed to Load.</div>}

      {currency && (
        <>
          <div className={styles.maininfo}>
            <h1>
              {currency.name} ({currency.symbol})
            </h1>
            <div className={styles.pricearea}>
              <Price
                className={styles.price}
                key={currency.priceUsd}
                value={currency.priceUsd}
                changeDirection={currency.changed}
              />
              <PercentageArea
                className={styles.percentage}
                value={currency.changePercent24Hr}
              />
            </div>
          </div>
          <div className={styles.otherinfo}>
            <div className={styles.col}>
              <h2>Market Cap</h2>
              <div className={styles.value}>
                <Price value={currency.marketCapUsd} />
              </div>
            </div>
            <div className={styles.col}>
              <h2>Volume (24Hr)</h2>
              <div className={styles.value}>
                <Price value={currency.volumeUsd24Hr} />
              </div>
            </div>
            <div className={styles.col}>
              <h2>Supply</h2>

              <div className={styles.value}>
                <SupplyPrice
                  className={styles.col}
                  value={currency.supply}
                  symbol={currency.symbol}
                  max={currency.maxSupply}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CurrenciesHeader;
