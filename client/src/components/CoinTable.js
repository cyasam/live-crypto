import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './CoinTable.module.css';
import CoinPage from './CoinPage';
import LoadMoreButton from './LoadMoreButton';

function CoinTable() {
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const pages = [];

  for (let i = 0; i < page; i++) {
    pages.push(
      <CoinPage
        key={i}
        page={i + 1}
        limit={50}
        onLoading={() => {
          page === 1 && setLoading(true);
        }}
        onSuccess={() => {
          page === 1 && setLoading(false);
          setLoadMore(false);
        }}
      />
    );
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      <div
        className={classNames(styles.container, { [styles.loading]: loading })}
      >
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={classNames(styles.th, styles.rank)}>#</th>
              <th className={classNames(styles.th, styles.name)}>Name</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Market Cap</th>
              <th className={styles.th}>Volume (24h)</th>
              <th className={styles.th}>Circulating Supply</th>
              <th className={styles.th}>24h %</th>
            </tr>
          </thead>
          <tbody>{pages}</tbody>
        </table>
        <LoadMoreButton
          loading={loadMore}
          onClick={(e) => {
            e.preventDefault();

            setLoadMore(true);
            setPage(page + 1);
          }}
        />
      </div>
    </>
  );
}

export default CoinTable;
