import httpProxyMiddleware from 'http-proxy-middleware';

import paths from '../../config/paths';
import config from '../../app/config';

const proxySetting = require(paths.appPackageJson).proxy;

const setAuthorizationHeader = (proxyReq, req) => {
  if (!proxyReq.hasHeader('Authorization')) {
    let token = null;

    if ('cookies' in req) {
      if (config.auth.tokenCookie in req.cookies) {
        token = req.cookies[config.auth.tokenCookie];
      }
    }

    if (token) {
      proxyReq.setHeader('Authorization', `Token ${token}`);
    }
  }
};

const handleProxyError = (err, req, res) => {
  res.writeHead(502, {
    'Content-Type': 'text/plain',
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
};

const handleProxyRequest = (proxyReq, req) => {
  setAuthorizationHeader(proxyReq, req);
};

const handleProxyResponse = (proxyRes, req, res) => {};

const handleProxyRequestWs = (proxyReq, req, socket, options, head) => {};

module.exports = (app, server) => {
  Object.keys(proxySetting).forEach(context => {
    const proxyConfig = proxySetting[context];

    const proxy = httpProxyMiddleware({
      ...proxyConfig,
      onError: handleProxyError,
      onProxyReq: handleProxyRequest,
      onProxyRes: handleProxyResponse,
      onProxyReqWs: handleProxyRequestWs,
    });

    app.use(context, proxy);

    if (proxyConfig.ws) {
      // noinspection JSUnresolvedVariable
      server.on('upgrade', proxy.upgrade);
    }
  });
};
