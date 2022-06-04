import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function Price({ value }) {
  return <>{formatter.format(value)}</>;
}

export default Price;
