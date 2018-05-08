import httpProxyMiddleware from 'http-proxy-middleware';

import createLogger from 'utils/createLogger';

const logger = createLogger(__filename);

const authCookie = process.env.SHINTO_AUTH_TOKEN_COOKIE;
const authHeader = process.env.SHINTO_PROXY_API_AUTH_HEADER;
const authRequired = process.env.SHINTO_AUTH_REQUIRED === 'true';

const setAuthorizationHeader = (proxyReq, req) => {
  if (!proxyReq.hasHeader('Authorization')) {
    let token = null;

    if (req.cookies && authCookie) {
      token = req.cookies[authCookie];
    }

    if (token) {
      proxyReq.setHeader('Authorization', `${authHeader} ${token}`);
    }
  }
};

const handleProxyError = (err, req, res) => {
  logger(err);

  res.writeHead(502, {
    'Content-Type': 'text/plain',
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
};

const handleProxyRequest = (proxyReq, req) => {
  logger('Handle Proxy Request: %s', req.path);

  if (authRequired) {
    setAuthorizationHeader(proxyReq, req);
  }
};

const handleProxyRequestWs = (proxyReq, req) => {
  logger('Handle Proxy Web Socket Request: %s', req.path);
};

module.exports = (app, server) => {
  const apiProxy = httpProxyMiddleware({
    target: process.env.SHINTO_PROXY_API_TARGET,
    ws: process.env.SHINTO_PROXY_API_WEB_SOCKET,
    onError: handleProxyError,
    onProxyReq: handleProxyRequest,
    onProxyReqWs: handleProxyRequestWs,
  });

  app.use(process.env.SHINTO_PROXY_API_PATH, apiProxy);

  if (process.env.SHINTO_PROXY_API_WEB_SOCKET) {
    // noinspection JSUnresolvedVariable
    server.on('upgrade', apiProxy.upgrade);
  }
};
