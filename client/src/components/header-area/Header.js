import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import LoginArea from './LoginArea';
import SearchArea from '../search/SearchArea';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.mainheader}>
      <div className={classNames('container', styles.container)}>
        <div className={styles.inner}>
          <div className={styles.logoarea}>
            <Link to="/">
              <img
                src="/images/logo.svg"
                width={36}
                height={38}
                alt="Coin Prices"
              />
            </Link>
            <h1>
              <Link to="/">Coin Prices</Link>
            </h1>
          </div>

          <SearchArea />
          <LoginArea />
        </div>
      </div>
    </header>
  );
}

export default Header;
