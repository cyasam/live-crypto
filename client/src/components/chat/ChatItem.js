import React from 'react';
import { motion, useIsPresent } from 'framer-motion';

import styles from './ChatItem.module.css';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

const ChatItemInner = ({ message }) => {
  const { status, created_at } = message;

  return (
    <>
      <div className={styles.userinfo}>
        {message?.user?.picture && (
          <img
            className={styles.picture}
            src={message.user.picture}
            width="24"
            height="24"
            alt={message.user.name}
          />
        )}
        <p className={styles.name}>{message.user.name}</p>
        {created_at && (
          <span className={styles.date}>{formatDate(created_at)}</span>
        )}
        {status === 'sending' && <span className={styles.info}>{status}</span>}
      </div>
      <p className={styles.message}>{message.message}</p>
    </>
  );
};

const transition = {
  type: 'spring',
  stiffness: 1000,
  damping: 50,
  mass: 1,
};

function ChatItem({ message }) {
  const isPresent = useIsPresent();

  const animations = {
    layout: true,
    initial: 'out',
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { opacity: 1 },
      out: { opacity: 0 },
    },
    transition,
  };

  return (
    <motion.div {...animations} className={styles.messagearea}>
      <ChatItemInner message={message} />
    </motion.div>
  );
}

export default ChatItem;
