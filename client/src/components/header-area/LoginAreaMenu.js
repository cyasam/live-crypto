import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import useAuth from '../../hooks/use-auth';

import styles from './LoginAreaMenu.module.css';

const variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  closed: { opacity: 0, y: -20, transition: { duration: 0.1 } },
};

const overlayVariants = {
  open: { opacity: 0.2, transition: { duration: 0.2 } },
  closed: { opacity: 0, transition: { duration: 0.1 } },
};

function LoginAreaMenu({ isOpen, toggleOpen }) {
  const { user, logout } = useAuth();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={overlayVariants}
            onClick={() => toggleOpen()}
          />
          <motion.div
            className={styles.usermenu}
            initial="closed"
            exit="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
          >
            <div className={styles.userdetail}>
              <img
                loading="lazy"
                className={styles.userpicture}
                src={user.picture}
                width="40"
                height="40"
                alt={user.name}
              />
              <div className={styles.info}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.email}>{user.email}</p>
                <button
                  className={styles.logoutbtn}
                  type="button"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LoginAreaMenu;
