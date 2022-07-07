import React from 'react';
import { motion, useIsPresent } from 'framer-motion';
import TimeAgo from 'react-timeago';

import styles from './ChatItem.module.css';

const formatDefaultChatDate = (value) => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
  }).format(value);
};

const ChatDate = ({ value }) => {
  if (!value) return null;

  const now = new Date().getTime();
  const date = new Date(value).getTime();
  const oneday = 24 * 60 * 60 * 1000;
  const formattedDate = formatDefaultChatDate(date);

  if (now - date < oneday) {
    return (
      <span className={styles.date}>
        <TimeAgo
          date={date}
          maxPeriod={oneday}
          title={formattedDate}
          formatter={(_, unit, __, ___, nextFormatter) => {
            if (unit === 'second') {
              return 'New';
            }

            return nextFormatter();
          }}
        />
      </span>
    );
  }

  return <span className={styles.date}>{formattedDate}</span>;
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
        <p className={styles.name}>{message?.user?.name}</p>

        <ChatDate value={created_at} />

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
