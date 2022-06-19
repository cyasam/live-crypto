import React from 'react';
import { formatCurrency } from '@coingecko/cryptoformat';

function Price({ className, value }) {
  value = formatCurrency(value, 'USD', 'en');

  return <span className={className}>{value}</span>;
}

export default Price;
