import './env';

import http from 'http';
import express from 'express';
import apiRoute from './api';
import createSocket from './socket';
import path from 'node:path';

const PORT = process.env.PORT || '3001';

const app = express();

app.use('/api', apiRoute);

app.use(express.static('./client/build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const server = http.createServer(app);

createSocket(server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
