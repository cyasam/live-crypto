import React, { useState } from 'react';
import classNames from 'classnames';
import CoinPage from './CoinPage';
import LoadMoreButton from '../generic/LoadMoreButton';

import styles from './CoinTable.module.css';
import { useEffect } from 'react';

function CoinTable() {
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesJSX, setPagesJSX] = useState(null);

  useEffect(() => {
    const renderPages = () => {
      const pages = [];

      for (let i = 0; i < page; i++) {
        pages.push(
          <CoinPage
            key={i}
            page={i + 1}
            limit={50}
            onLoading={() => {
              setError(false);
            }}
            onSuccess={() => {
              setLoadMore(false);
              setError(false);
            }}
            onError={() => {
              setLoadMore(false);
              setError(true);
            }}
          />
        );
      }

      setPagesJSX(pages);
    };

    renderPages();
  }, [page]);

  return (
    <>
      <div className={styles.tablecontainer}>
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
          <tbody>{pagesJSX}</tbody>
        </table>
      </div>
      <div className={styles.loadmorewrapper}>
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
