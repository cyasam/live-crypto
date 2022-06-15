import React from 'react';
import { motion, useCycle } from 'framer-motion';
import useAuth from '../../hooks/use-auth';
import GoogleLogin from './GoogleLogin';
import LoginAreaMenu from './LoginAreaMenu';

import styles from './LoginArea.module.css';

const variants = {
  open: {
    rotate: 180,
    transition: { duration: 0.2 },
  },
  closed: { rotate: 0, transition: { duration: 0.2 } },
};

function LoginArea() {
  const { user } = useAuth();
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className={styles.loginarea}>
      <GoogleLogin />
      {user && (
        <div className={styles.userarea}>
          <div className={styles.useraction} onClick={() => toggleOpen()}>
            <img
              loading="lazy"
              className={styles.userpicture}
              src={user.picture}
              width="40"
              height="40"
              alt={user.name}
            />
            <div className={styles.icon}>
              <motion.svg
                animate={isOpen ? 'open' : 'closed'}
                variants={variants}
                className={styles.svg}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5655 7.03753L0.646004 1.86639L1.80701 0.646L6.146 5.20867L10.485 0.646L11.646 1.86639L6.7265 7.03753L6.146 7.646L5.5655 7.03753Z"
                  fill="black"
                />
              </motion.svg>
            </div>
          </div>
          <LoginAreaMenu isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>
      )}
    </div>
  );
}

export default LoginArea;
