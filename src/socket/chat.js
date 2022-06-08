import { Server } from 'socket.io';

const createChatSocket = (server) => {
  const io = new Server(server, {
    path: '/chat',
  });

  io.on('connection', (socket) => {
    socket.on('disconnect', async (reason) => {
      console.log('Disconnected');
      externalSocket && externalSocket.close();
    });
  });
};

export default createChatSocket;
