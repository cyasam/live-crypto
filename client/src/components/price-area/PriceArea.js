import React, { useEffect, useState } from 'react';
import { usePriceSocketStore } from '../../hooks/use-price-socket';
import Price from './Price';

function PriceArea({ id, value }) {
  const [price, setPrice] = useState(value);
  const [changed, setChanged] = useState(value);
  const changes = usePriceSocketStore((state) => state.changes);
  const newPrice = changes && changes[id] && Number(changes[id]);

  useEffect(() => {
    if (newPrice) {
      setPrice(newPrice);

      if (newPrice > price) {
        setChanged('up');
      } else if (newPrice < price) {
        setChanged('down');
      }
    }
  }, [newPrice, price]);

  return <Price key={price} value={price} changeDirection={changed} />;
}

export default PriceArea;
