import React, { useState } from 'react';
import classNames from 'classnames';
import CoinPage from './CoinPage';
import LoadMoreButton from '../LoadMoreButton';

import styles from './CoinTable.module.css';
import Loading from '../Loading';

function CoinTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
          !loadMore && setLoading(true);
          setError(false);
        }}
        onSuccess={() => {
          !loadMore && setLoading(false);
          setLoadMore(false);
          setError(false);
        }}
        onError={() => {
          !loadMore && setLoading(false);
          setLoadMore(false);
          setError(true);
        }}
      />
    );
  }

  return (
    <>
      {loading && <Loading />}
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
          error={error}
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
