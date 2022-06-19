import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePriceSocketStore } from '../../hooks/use-price-socket';
import Price from './Price';

const variants = {
  up: {
    color: '#16c784',
  },
  down: {
    color: '#dd5d65',
  },
};

function PriceArea({ id, value, color }) {
  const [price, setPrice] = useState(value);
  const [changed, setChanged] = useState(null);
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

  const changeProp = {};
  if (changed) {
    changeProp.initial = changed;
    changeProp.animate = {
      color: color ?? '#000',
    };
  }

  return (
    <motion.div
      key={price}
      transition={{ duration: 0.4, delay: 1 }}
      variants={variants}
      {...changeProp}
    >
      <Price value={price} />
    </motion.div>
  );
}

export default PriceArea;
