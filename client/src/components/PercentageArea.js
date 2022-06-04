import classNames from 'classnames';
import styles from './PercentageArea.module.css';

function PercentageArea({ value }) {
  let Arrow = <i className={classNames(styles.indicator, styles.nochange)}></i>;

  if (value > 0) {
    Arrow = (
      <i className={classNames(styles.indicator, styles.arrow, styles.up)}></i>
    );
  } else if (value < 0) {
    Arrow = (
      <i
        className={classNames(styles.indicator, styles.arrow, styles.down)}
      ></i>
    );
  }

  return (
    <div className={styles.percentage}>
      {Arrow}
      <span
        className={classNames(styles.text, {
          [styles.up]: value > 0,
          [styles.down]: value < 0,
        })}
      >
        {value.toFixed(2).replace('-', '')}%
      </span>
    </div>
  );
}

export default PercentageArea;
