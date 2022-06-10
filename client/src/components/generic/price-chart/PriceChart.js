import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import options from './options';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const processData = (currencyData) => {
  const prices = currencyData.map((currency) => {
    return {
      x: currency.date,
      y: Number(currency.priceUsd),
    };
  });

  return prices;
};

function PriceChart({ data }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    data && setChartData(data);
  }, [data]);

  if (!chartData) return null;

  const prices = processData(chartData);

  const backgroundColor = 'rgba(230,239,244, 0.5)';
  const borderColor = 'rgb(214 106 112)';

  const lastChartData = {
    datasets: [
      {
        data: prices,
        fill: true,
        borderColor,
        backgroundColor,
      },
    ],
  };

  return <Line options={options} data={lastChartData} />;
}

export default PriceChart;
