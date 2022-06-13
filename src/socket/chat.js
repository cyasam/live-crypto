import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON
);

const allMessages = {};

const createChatSocket = (server) => {
  const io = new Server(server, {
    path: '/chat',
  });

  io.on('connection', (socket) => {
    socket.on('connect-room', (room) => {
      const roomName = `room:${room}`;

      socket.join(roomName);

      if (!allMessages[roomName]) {
        allMessages[roomName] = [];
      }

      socket.emit('all-messages', allMessages[roomName]);

      socket.on('send-message', async (data) => {
        try {
          console.time('send-message');
          const { user, error } = await supabase.auth.api.getUser(data.token);

          if (error) throw Error(error);

          if (!user) throw Error('User session expired');

          const { data: createdMessage, error2 } = await supabase
            .from('chat')
            .upsert({
              id: data.id,
              message: data.message,
              user_id: data.user.id,
              room,
            });

          if (error2) throw Error(error2);

          const { id, message, created_at } = createdMessage[0];
          const newMessage = {
            id,
            message,
            user: data.user,
            created_at,
          };

          socket.emit('message-sent', { id, created_at });
          socket.broadcast.to(roomName).emit('get-message', newMessage);
          console.timeEnd('send-message');

          allMessages[roomName] = [newMessage, ...allMessages[roomName]];
        } catch (err) {
          console.log(error);
          return null;
        }
      });
    });

    socket.on('disconnect', async () => {
      console.log('Disconnected');
    });
  });
};

export default createChatSocket;
