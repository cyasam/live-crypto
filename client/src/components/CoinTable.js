import React from 'react';
import classNames from 'classnames';
import styles from './CoinTable.module.css';
import PercentageArea from './PercentageArea';
import Price from './Price';

function CoinTable({ assets }) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={classNames(styles.th, styles.rank)}>#</th>
          <th className={classNames(styles.th, styles.name)}>Name</th>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>24h %</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => {
          const price = Number(asset.priceUsd).toFixed(2);

          const changePercent24Hr = Number(asset.changePercent24Hr);

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
                  />
                  <span>{asset.name}</span>
                  <span className={styles.symbol}>{asset.symbol}</span>
                </div>
              </td>
              <td className={styles.td}>
                <Price value={price} />
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
