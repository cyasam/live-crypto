import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/use-auth';

import styles from './LoginArea.module.css';

function LoginArea() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const [initialize, setInitialize] = useState(false);

  const renderButton = () => {
    window.google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  };

  useEffect(() => {
    if (window) {
      function handleCredentialResponse(response) {
        const token = response.credential;
        login(token);
      }

      window.addEventListener('load', function () {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          autoselect: true,
          callback: handleCredentialResponse,
        });

        setInitialize(true);

        !user && window.google.accounts.id.prompt();
      });
    }
  }, [user, login]);

  useEffect(() => {
    if (!isLoggedIn()) {
      initialize && window.google.accounts.id.disableAutoSelect();
    }
  }, [isLoggedIn, initialize]);

  return (
    <div className={styles.loginarea}>
      {initialize && !user && (
        <div ref={() => renderButton()} id="google-button"></div>
      )}
      {user && (
        <div className={styles.userarea}>
          <img src={user.picture} width="32" height="32" alt={user.name} />
          {user.name}
          <button
            type="button"
            onClick={() => {
              logout();
              window.google.accounts.id.disableAutoSelect();
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
