import classNames from 'classnames';

import styles from './CoinTable.module.css';

function CoinPageLoader() {
  const rows = [];

  for (let i = 0; i < 5; i++) {
    rows.push(
      <tr key={i} className={classNames(styles.tbodytr, styles.loading)}>
        <td className={classNames(styles.td, styles.rank, styles.placeholder)}>
          <div></div>
        </td>
        <td className={classNames(styles.td, styles.name, styles.placeholder)}>
          <div></div>
        </td>
        <td className={classNames(styles.td, styles.placeholder)}>
          <div></div>
        </td>
        <td className={classNames(styles.td, styles.placeholder)}>
          <div></div>
        </td>
        <td className={classNames(styles.td, styles.placeholder)}>
          <div></div>
        </td>
        <td
          className={classNames(styles.td, styles.supply, styles.placeholder)}
        >
          <div></div>
        </td>
        <td className={classNames(styles.td, styles.placeholder)}>
          <div></div>
        </td>
      </tr>
    );
  }

  return <>{rows}</>;
}

export default CoinPageLoader;
