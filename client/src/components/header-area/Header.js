import React from 'react';
import LoginArea from './LoginArea';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.mainheader}>
      <div className="container">
        <div className={styles.header}>
          <h1>Coin Prices</h1>
          <LoginArea />
        </div>
      </div>
    </header>
  );
}

export default Header;
