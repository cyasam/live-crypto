import React from 'react';

function Price({ value, currency }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  });

  return <>{formatter.format(value)}</>;
}

export default Price;
