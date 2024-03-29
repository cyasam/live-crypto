import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import useAuth from '../../hooks/use-auth';
import Form from './Form';
import Loading from '../generic/Loading';
import ChatItem from './ChatItem';

import styles from './Chat.module.css';

function Chat({ room }) {
  const { user, token, isLoggedIn } = useAuth();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState(null);

  const socketRef = useRef();
  const chatareaRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: messages } = await axios.get(`/api/chat/${room}/messages`);

      setMessages(messages.data);
    };

    fetchMessages();
  }, [room]);

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

      chatareaRef.current.scrollTop = 0;

      setMessages((messages) => [
        { ...messageObj, status: 'sending' },
        ...messages,
      ]);
      socketRef.current.emit('send-message', { ...messageObj, token });
    },
    [user, token, socketRef]
  );

  useEffect(() => {
    if (connected) {
      return
    }

    socketRef.current = io('/', {
      path: '/chat',
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('connect-room', room);

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

    return () => connected && socketRef.current.disconnect();
  }, [room, connected]);



  return (
    <div className={styles.container}>
      {!connected ? (
        <Loading />
      ) : (
        <>
          <div ref={chatareaRef} className={styles.chatarea}>
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
