import React from 'react';
import styles from './SupplyPrice.module.css';

function SupplyPrice({ value, symbol, max }) {
  value = Number(value);
  max = Number(max);

  return (
    <div className="supply-price">
      <span>
        {new Intl.NumberFormat('en-US').format(value)} {symbol}
      </span>
      {max > 0 && value < max && (
        <div className={styles.container}>
          <progress value={value} max={max}>
            {value}
          </progress>
        </div>
      )}
    </div>
  );
}

export default SupplyPrice;
