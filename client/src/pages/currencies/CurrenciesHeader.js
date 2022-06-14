import React from 'react';
import useSWR from 'swr';
import Error from '../../components/generic/Error';
import PercentageArea from '../../components/percentage-area/PercentageArea';
import SupplyPrice from '../../components/SupplyPrice';
import { fetcher, processOneData } from '../../utils';
import styles from './CurrenciesHeader.module.css';
import CurrenciesHeaderLoader from './CurrenciesHeaderLoader';
import Price from '../../components/price-area/Price';
import PriceArea from '../../components/price-area/PriceArea';

function CurrenciesHeader({ currencyId }) {
  const { data: asset, error } = useSWR(`/api/assets/${currencyId}`, fetcher, {
    refreshInterval: 60 * 1000,
  });

  if (!asset) return <CurrenciesHeaderLoader />;

  if (error) return <Error />;

  const currency = processOneData(asset.data);

  return (
    <div className={styles.header}>
      {currency && (
        <>
          <div className={styles.maininfo}>
            <img
              loading="lazy"
              src={currency.img_url}
              width={40}
              height={40}
              alt={asset.name}
              className={styles.coinimage}
            />

            <div className={styles.heading}>
              <h1>
                {currency.name} ({currency.symbol})
              </h1>

              <div className={styles.pricearea}>
                <div className={styles.price}>
                  <PriceArea id={currency.id} value={currency.priceUsd} />
                </div>

                <div className={styles.percentage}>
                  <PercentageArea
                    id={currency.id}
                    value={currency.priceUsd}
                    price24hUsd={currency.price24hUsd}
                  />
                </div>
              </div>
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
