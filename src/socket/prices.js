import '../env';
import { Server } from 'socket.io';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const createPricesSocket = (server) => {
  const io = new Server(server, {
    path: '/prices',
  });

  io.on('connection', (socket) => {
    let externalSocket;

    socket.on('getPrices', (assets) => {
      externalSocket = new W3CWebSocket(
        `${process.env.EXTERNAL_SOCKET_URL}?assets=${assets}`
      );
      externalSocket.onerror = function () {
        console.log('Connection Error');
      };

      externalSocket.onopen = function () {
        console.log('WebSocket Client Connected');
      };

      externalSocket.onmessage = function (e) {
        //console.log('Getting Data');
        socket.emit('prices', e.data);
      };

      externalSocket.onclose = function (e) {
        console.log('Closed');
      };
    });

    socket.on('disconnect', async (reason) => {
      console.log('Disconnected');
      externalSocket && externalSocket.close();
    });
  });
};

export default createPricesSocket;
