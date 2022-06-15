import './env';

import http from 'http';
import express from 'express';
import apiRoute from './api';
import path from 'node:path';
import compression from 'compression';
import serveStatic from 'serve-static';

import createPricesSocket from './socket/prices';
import createChatSocket from './socket/chat';
import connectRedisServer from './redis';

const PORT = process.env.PORT || '3001';

const app = express();

app.use(compression());

app.use('/api', apiRoute);

app.use(express.static('./client/build'));
app.use(serveStatic(path.join(__dirname, './client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const server = http.createServer(app);

connectRedisServer();
createPricesSocket(server);
createChatSocket(server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
