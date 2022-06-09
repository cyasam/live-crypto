import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import PriceChart from '../../components/generic/PriceChart';
import Loading from '../../components/Loading';
import { fetcher } from '../../utils';

import styles from './PriceContainr.module.css';

const getStartEndDate = (interval) => {
  const end = new Date().getTime();
  const start = end - 24 * 60 * 60 * 1000;

  const query = new URLSearchParams({
    interval,
    start,
    end,
  });

  return query.toString();
};

function PriceChartContainer({ currencyId }) {
  const [queryString, setQueryString] = useState(null);

  const { data: candles, error } = useSWR(
    queryString ? `/api/assets/${currencyId}/history?${queryString}` : null,
    fetcher,
    {
      refreshInterval: 60 * 1000,
    }
  );

  useEffect(() => {
    setQueryString(getStartEndDate('m5'));
  }, []);

  if (!candles)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  if (error) return <div>Failed to load.</div>;

  return (
    <div className={styles.chart}>
      <PriceChart data={candles.data} />
    </div>
  );
}

export default PriceChartContainer;
