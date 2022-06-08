import React from 'react';
import LoginArea from './LoginArea';

import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.mainheader}>
      <div className="container">
        <div className={styles.header}>
          <h1>
            <Link to="/">Coin Prices</Link>
          </h1>
          <LoginArea />
        </div>
      </div>
    </header>
  );
}

export default Header;
