import './env';
import { Server } from 'socket.io';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const createSocket = (server) => {
  const io = new Server(server, {
    path: '/socket',
  });

  io.on('connection', (socket) => {
    const externalSocket = new W3CWebSocket(process.env.EXTERNAL_SOCKET_URL);
    externalSocket.onerror = function () {
      console.log('Connection Error');
    };

    externalSocket.onopen = function () {
      console.log('WebSocket Client Connected');
    };

    externalSocket.onmessage = function (e) {
      console.log('Getting Data');
      socket.emit('prices', e.data);
    };

    externalSocket.onclose = function (e) {
      console.log('Closed');
    };

    socket.on('disconnect', async (reason) => {
      console.log('Disconnected');
      externalSocket.close();
    });
  });
};

export default createSocket;
