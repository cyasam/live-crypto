import { formatCurrency } from '@coingecko/cryptoformat';

const options = {
  animation: {
    duration: 0,
  },
  scales: {
    x: {
      grid: { display: false },
      type: 'time',
      time: {
        displayFormats: { hour: 'HH:mm' },
      },
      ticks: {
        autoSkip: false,
        maxRotation: 30,
        major: {
          enabled: true,
        },
        font: function (context) {
          const font = {};

          if (context?.tick?.major) {
            font.weight = 'bold';
          }

          return font;
        },
      },
    },
    y: {
      grid: {
        drawBorder: false,
      },
      ticks: {
        mirror: true,
        z: 5,
        callback(value) {
          return formatCurrency(value, 'USD', 'en');
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: false,
    tooltip: {
      mode: 'index',
      callbacks: {
        title(items) {
          const date = new Date(items[0].label);
          return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: 'h23',
          }).format(date);
        },
        label(item) {
          const price = item.raw.y;
          return formatCurrency(price, 'USD', 'en');
        },
      },
    },
  },
};

export default options;
