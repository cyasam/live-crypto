import React, { useState } from 'react';

import styles from './Form.module.css';

function Form({ isLoggedIn, sendMessage }) {
  const [message, setMessage] = useState('');

  if (!isLoggedIn)
    return <p className={styles.notification}>You need to login to write</p>;

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        if (message.length === 0) return;

        sendMessage(message);
        setMessage('');
      }}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => {
          const text = e.target.value.trim();
          setMessage(text);
        }}
      />
      <button className={styles.button} type="submit">
        Send
      </button>
    </form>
  );
}

export default Form;
