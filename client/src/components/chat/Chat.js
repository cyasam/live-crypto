import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/use-auth';
import Form from './Form';
import Loading from '../Loading';

import styles from './Chat.module.css';
import classNames from 'classnames';

let socket;

function Chat({ room }) {
  const { userId, user, isLoggedIn } = useAuth();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const mounted = useRef(false);

  const sendMessage = useCallback(
    (socket, message) => {
      socket.emit('send-message', {
        user: {
          id: userId,
          name: user?.name,
          picture: user?.picture,
        },
        message,
      });
    },
    [userId, user?.name, user?.picture]
  );

  useEffect(() => {
    if (mounted.current || connected) return;
    mounted.current = true;

    socket = io('/', {
      path: '/chat',
    });

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('connect-room', room);

      socket.on('all-messages', (allMessages) => {
        setMessages(allMessages);
      });

      socket.on('get-message', (message) => {
        setMessages((messages) => [message, ...messages]);
      });
    });

    return () => connected && socket.disconnect();
  }, [room, connected]);

  return (
    <div className={styles.container}>
      {!connected ? (
        <Loading />
      ) : (
        <>
          <div className={styles.chatarea}>
            {messages?.map((data, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.messagearea, {
                    [styles.me]: userId === data.user.id,
                  })}
                >
                  <div className={styles.userinfo}>
                    {data?.user?.picture && (
                      <img
                        className={styles.picture}
                        src={data.user.picture}
                        width="18"
                        height="18"
                        alt={data.user.name}
                      />
                    )}
                    <p className={styles.name}>{data.user.name}</p>
                  </div>
                  <p className={styles.message}>{data.message}</p>
                </div>
              );
            })}
          </div>
          <Form
            isLoggedIn={isLoggedIn}
            sendMessage={(message) => sendMessage(socket, message)}
          />
        </>
      )}
    </div>
  );
}

export default Chat;
