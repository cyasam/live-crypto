import React, { useState } from 'react';
import { useRef } from 'react';

import styles from './Form.module.css';

function Form({ isLoggedIn, userPicture, sendMessage }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  if (!isLoggedIn)
    return <p className={styles.notification}>You need to login to write</p>;

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        if (message.length === 0) return;

        sendMessage(message.trim());
        setMessage('');
        inputRef.current.blur();
      }}
    >
      {userPicture && (
        <img
          className={styles.picture}
          src={userPicture}
          width="24"
          height="24"
          alt="user"
        />
      )}
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Send a message"
        value={message}
        onChange={(e) => {
          const text = e.target.value;
          setMessage(text);
        }}
      />
      <button className={styles.button} type="submit">
        Chat
      </button>
    </form>
  );
}

export default Form;
