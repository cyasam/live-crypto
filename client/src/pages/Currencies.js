import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import PercentageArea from '../components/PercentageArea';
import Price from '../components/Price';
import SupplyPrice from '../components/SupplyPrice';
import usePriceSocket from '../hooks/use-price-socket';
import { fetcher, processOneData } from '../utils';

import styles from './Currencies.module.css';

function Currencies() {
  const params = useParams();
  const { currencyId } = params;

  const { data: asset, error } = useSWR(`/api/assets/${currencyId}`, fetcher, {
    refreshInterval: 60 * 1000,
  });

  const { changes } = usePriceSocket(currencyId);

  const currency = asset ? processOneData(asset.data, changes) : null;

  return (
    <Modal>
      {!currency && !error && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {error && <div className={styles.error}>Failed to Load.</div>}
      {currency && (
        <div className={styles.header}>
          <div className={styles.maininfo}>
            <h1>
              {currency.name}({currency.symbol})
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
        </div>
      )}
    </Modal>
  );
}

export default Currencies;
