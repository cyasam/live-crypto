import React from 'react';
import Error from './Error';
import Loading from './Loading';
import styles from './LoadMoreButton.module.css';

function LoadMoreButton({ loading, error, onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {loading && <Loading height="1.2em" />}
      {error && <Error />}
      {!loading && !error && 'Load More'}
    </button>
  );
}

export default LoadMoreButton;
