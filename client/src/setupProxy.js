const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    '/prices',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'ws://localhost:3001',
      ws: true,
      changeOrigin: true,
      secure: false,
    })
  );
};
