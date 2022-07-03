import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Error from '../../components/generic/Error';
import PriceChart from '../../components/price-chart/PriceChart';
import { fetcher } from '../../utils';

import styles from './PriceChartContainer.module.css';
import PriceChartContainerLoader from './PriceChartContainerLoader';

const chartTypeList = ['1D', '1W', '1M', '3M', '6M', '1Y', 'all'];

const createQuery = (chartType) => {
  if (!chartType) return null;

  const end = new Date().getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  let start = end - oneDay;
  let interval = 'm5';

  if (chartType === '1W') {
    start = end - 7 * oneDay;
    interval = 'm30';
  } else if (chartType === '1M') {
    start = end - 30 * oneDay;
    interval = 'h1';
  } else if (chartType === '3M') {
    start = end - 3 * 30 * oneDay;
    interval = 'h6';
  } else if (chartType === '6M') {
    start = end - 6 * 30 * oneDay;
    interval = 'h12';
  } else if (chartType === '1Y') {
    start = end - 12 * 30 * oneDay;
    interval = 'd1';
  } else if (chartType === 'all') {
    start = end - 11 * 12 * 30 * oneDay;
    interval = 'd1';
  }

  const query = new URLSearchParams({
    interval,
    start,
    end,
  });

  return query.toString();
};

function PriceChartContainer({ currencyId }) {
  const [chartType, setChartType] = useState('1D');
  const [queryString, setQueryString] = useState(null);

  const changeChart = (chartType) => {
    setChartType(chartType);
  };

  const { data: candles, error } = useSWR(
    queryString ? `/api/assets/${currencyId}/history?${queryString}` : null,
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    setQueryString(createQuery(chartType));
  }, [chartType]);

  return (
    <div className={styles.chartarea}>
      <div className={styles.chartblock}>
        {!candles && <PriceChartContainerLoader />}
        {error && <Error />}
        <PriceChart data={candles?.data} />
      </div>

      <div className={styles.buttons}>
        {chartTypeList.map((type) => (
          <button
            key={type}
            className={classNames(styles.button, {
              [styles.active]: type === chartType,
            })}
            onClick={() => changeChart(type)}
            disabled={type === chartType}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PriceChartContainer;
