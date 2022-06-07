import React from 'react';
import Loading from './Loading';
import styles from './LoadMoreButton.module.css';

function LoadMoreButton({ loading, onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {loading ? <Loading height="1.2em" /> : 'Load More'}
    </button>
  );
}

export default LoadMoreButton;
