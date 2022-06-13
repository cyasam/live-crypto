import React, { useEffect, useState } from 'react';
import { usePriceSocketStore } from '../../hooks/use-price-socket';
import Percentage from './Percentage';

function PercentageArea({ id, value, price24hUsd }) {
  const [price, setPrice] = useState(value);
  const changes = usePriceSocketStore((state) => state.changes);
  const newPrice = changes && changes[id] && Number(changes[id]);

  useEffect(() => {
    if (newPrice) {
      setPrice(newPrice);
    }
  }, [newPrice]);

  const changePercent24Hr = ((price - price24hUsd) / price24hUsd) * 100;
  return <Percentage value={changePercent24Hr} />;
}

export default PercentageArea;
