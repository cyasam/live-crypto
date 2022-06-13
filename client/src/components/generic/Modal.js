import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import styles from './Modal.module.css';

function Modal({ children, backUrl }) {
  const navigate = useNavigate();
  const contentRef = useRef();

  useEffect(() => {
    document.body.classList.add('modal');

    return () => document.body.classList.remove('modal');
  }, []);

  const clickOutside = (e) => {
    if (!contentRef.current.contains(e.target)) {
      backUrl && navigate(backUrl);
    }
  };

  return createPortal(
    <div className={styles.container} onClick={clickOutside}>
      <button className={styles.closebtn} type="button">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFF"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </svg>
      </button>
      <div className={styles.inner}>
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
