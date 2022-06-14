import classNames from 'classnames';
import React from 'react';
import styles from './CurrenciesHeader.module.css';

function CurrenciesHeaderLoader() {
  return (
    <div className={classNames(styles.header, styles.loading)}>
      <div className={styles.maininfo}>
        <div className={styles.coinimage}></div>
        <div className={styles.heading}></div>
      </div>
      <div className={styles.otherinfo}>
        <div className={styles.col}>
          <h2>Market Cap</h2>
          <div className={styles.value}></div>
        </div>
        <div className={styles.col}>
          <h2>Volume (24Hr)</h2>
          <div className={styles.value}></div>
        </div>
        <div className={styles.col}>
          <h2>Supply</h2>

          <div className={styles.value}></div>
        </div>
      </div>
    </div>
  );
}

export default CurrenciesHeaderLoader;
