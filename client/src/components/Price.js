import React from 'react';
import { formatCurrency } from '@coingecko/cryptoformat';

import styles from './Price.module.css';
import classNames from 'classnames';

function Price({ value, changeDirection }) {
  value = formatCurrency(value, 'USD', 'en');

  const priceClassName = classNames({
    [styles.up]: changeDirection === 'up',
    [styles.down]: changeDirection === 'down',
  });

  return <span className={priceClassName}>{value}</span>;
}

export default Price;
