import { Server } from 'socket.io';

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

      socket.on('send-message', (data) => {
        allMessages[roomName] = [data, ...allMessages[roomName]];

        io.sockets.to(roomName).emit('get-message', data);
      });
    });

    socket.on('disconnect', async () => {
      console.log('Disconnected');
    });
  });
};

export default createChatSocket;
