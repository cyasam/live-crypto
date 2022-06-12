import React from 'react';
import useAuth from '../../hooks/use-auth';
import GoogleLogin from './GoogleLogin';

import styles from './LoginArea.module.css';

function LoginArea() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.loginarea}>
      <GoogleLogin />
      {user && (
        <div className={styles.userarea}>
          <img
            className={styles.userpicture}
            src={user.picture}
            width="48"
            height="48"
            alt={user.name}
          />
          <div className={styles.userdetail}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.email}>{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginArea;
