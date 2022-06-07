import React from 'react';
import { Bars } from 'react-loading-icons';
import styles from './Loading.module.css';

function Loading({ showText, height }) {
  return (
    <div className={styles.container}>
      <Bars fill="#06bcee" height={height ?? '3em'} speed={1} />
      {showText && <p>Loading…</p>}
    </div>
  );
}

export default Loading;
