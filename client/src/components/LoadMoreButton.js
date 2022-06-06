import React from 'react';
import styles from './LoadMoreButton.module.css';

function LoadMoreButton({ loading, onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
}

export default LoadMoreButton;
