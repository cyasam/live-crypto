import classNames from 'classnames';
import React from 'react';
import styles from './PriceChartContainer.module.css';

function PriceChartContainerLoader() {
  return (
    <div className={classNames(styles.chartarea, styles.loading)}>
      <div className={styles.chartblock}></div>
      <div className={styles.buttons}></div>
    </div>
  );
}

export default PriceChartContainerLoader;
