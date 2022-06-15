import { Server } from 'socket.io';
import { supabase } from '../utils';

const checkAuthUser = async (token) => {
  const { user, error } = await supabase.auth.api.getUser(token);

  if (error) throw Error(error);

  if (!user) throw Error('User session expired');

  return user;
};

const createChatSocket = (server) => {
  const io = new Server(server, {
    path: '/chat',
  });

  io.on('connection', (socket) => {
    socket.on('connect-room', async (room) => {
      const roomName = `room:${room}`;
      socket.join(roomName);

      socket.on('send-message', async (data) => {
        try {
          console.time('send-message');
          const authUser = await checkAuthUser(data.token);

          const { data: createdMessage, error } = await supabase
            .from('chat')
            .upsert({
              id: data.id,
              message: data.message,
              user_id: authUser.id,
              room,
            })
            .select(
              `id,
              message,
              created_at,
              profiles (
                id,
                name,
                picture
              )`
            );

          if (error) throw Error(error);

          if (!createdMessage) return null;

          const { id, message, created_at, profiles } = createdMessage[0];
          const newMessage = {
            id,
            message,
            user: profiles,
            created_at,
          };

          socket.emit('message-sent', { id, created_at });
          socket.broadcast.to(roomName).emit('get-message', newMessage);
          console.timeEnd('send-message');
        } catch (error) {
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
