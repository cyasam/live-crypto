import React from 'react';
import { formatCurrency } from '@coingecko/cryptoformat';

function Price({ value }) {
  /*  if (value < 0.01) {
    return <>${value}</>;
  } */

  /*  const formatter = new Intl.NumberFormat('en-US', {
    currency: currency ?? 'USD',
  }); */

  value = formatCurrency(value, 'USD', 'en');

  return <>{value}</>;
}

export default Price;
