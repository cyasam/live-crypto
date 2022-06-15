import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Modal.module.css';

const variants = {
  open: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, scale: 0.97, transition: { duration: 0.5 } },
};

function Modal({ children, backUrl }) {
  const navigate = useNavigate();
  const contentRef = useRef();

  useEffect(() => {
    document.body.classList.add('modal');

    return () => document.body.classList.remove('modal');
  }, []);

  const clickOutside = (e) => {
    if (!contentRef.current.contains(e.target)) {
      clickClose();
    }
  };

  const clickClose = () => {
    backUrl && navigate(backUrl);
  };

  return createPortal(
    <AnimatePresence>
      <div className={styles.container} onClick={clickOutside}>
        <div className={styles.inner}>
          <motion.div
            ref={contentRef}
            className={styles.content}
            variants={variants}
            initial="closed"
            exit="closed"
            animate="open"
          >
            <button
              className={styles.closebtn}
              type="button"
              onClick={clickClose}
            >
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFF"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                <path fill="none" d="M0 0h24v24H0z"></path>
              </svg>
            </button>
            <div className={styles.contentinner}>{children}</div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.getElementById('modal-root')
  );
}

export default Modal;
