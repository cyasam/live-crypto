import React from 'react';
import classNames from 'classnames';
import styles from './CoinTable.module.css';
import PercentageArea from './PercentageArea';
import Price from './Price';
import Logo from '../logo.svg';
import SupplyPrice from './SupplyPrice';

function CoinTable({ assets }) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={classNames(styles.th, styles.rank)}>#</th>
          <th className={classNames(styles.th, styles.name)}>Name</th>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>Market Cap</th>
          <th className={styles.th}>Volume (24h)</th>
          <th className={styles.th}>Circulating Supply</th>
          <th className={styles.th}>24h %</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => {
          const price = Number(asset.priceUsd).toFixed(2);

          const changePercent24Hr = Number(asset.changePercent24Hr);

          const priceTdClassName = classNames(styles.td, {
            [styles.up]: asset.changed === 'up',
            [styles.down]: asset.changed === 'down',
          });

          return (
            <tr className={styles.tbodytr} key={asset.id}>
              <td className={classNames(styles.td, styles.rank)}>
                {asset.rank}
              </td>
              <td className={classNames(styles.td, styles.name)}>
                <div className={styles.nameblock}>
                  <img
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
      </tbody>
    </table>
  );
}

export default CoinTable;
