import classNames from 'classnames';
import styles from './Percentage.module.css';

function Percentage({ type, value }) {
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
    <div
      className={classNames(styles.percentage, {
        [styles.dark]: type === 'dark',
      })}
    >
      <span
        className={classNames(styles.text, {
          [styles.up]: value > 0,
          [styles.down]: value < 0,
        })}
      >
        {value.toFixed(2)}%
      </span>
      {Arrow}
    </div>
  );
}

export default Percentage;
