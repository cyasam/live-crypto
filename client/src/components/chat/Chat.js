import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import useAuth from '../../hooks/use-auth';
import Form from './Form';
import Loading from '../generic/Loading';

import ChatItem from './ChatItem';

import styles from './Chat.module.css';

function Chat({ room }) {
  const { user, token, isLoggedIn } = useAuth();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();

  const mounted = useRef(false);

  const sendMessage = useCallback(
    (message) => {
      const messageObj = {
        id: uuidv4(),
        user: {
          id: user.id,
          name: user.name,
          picture: user.picture,
        },
        message,
      };

      setMessages((messages) => [
        { ...messageObj, status: 'sending' },
        ...messages,
      ]);
      socketRef.current.emit('send-message', { ...messageObj, token });
    },
    [user, token, socketRef]
  );

  useEffect(() => {
    if (mounted.current || connected) return;
    mounted.current = true;

    socketRef.current = io('/', {
      path: '/chat',
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('connect-room', room);

      socket.on('all-messages', (allMessages) => {
        setMessages(allMessages);
      });

      socket.on('get-message', (message) => {
        setMessages((messages) => [message, ...messages]);
      });

      socket.on('message-sent', (sentMessage) => {
        setMessages((messages) => {
          const processedMessages = messages.map((message) => {
            const { id, created_at } = sentMessage;
            if (message.id === id) {
              message.status = 'sent';
              message.created_at = created_at;
            }
            return message;
          });

          return processedMessages;
        });
      });
    });
  }, [room, connected]);

  useEffect(() => {
    return () => connected && socketRef.current.disconnect();
  }, [connected]);

  return (
    <div className={styles.container}>
      {!connected ? (
        <Loading />
      ) : (
        <>
          <div className={styles.chatarea}>
            <AnimatePresence>
              {messages?.map((message) => {
                return <ChatItem key={message.id} message={message} />;
              })}
            </AnimatePresence>
          </div>
          <Form
            isLoggedIn={isLoggedIn}
            userPicture={user?.picture}
            sendMessage={(message) => sendMessage(message)}
          />
        </>
      )}
    </div>
  );
}

export default Chat;
