import React from 'react';
import useAuth from '../../hooks/use-auth';

import styles from './GoogleLogin.module.css';

export default function GoogleLogin() {
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) return null;

  return (
    <button className={styles.googlebutton} onClick={login}>
      Sign in with Google
    </button>
  );
}
