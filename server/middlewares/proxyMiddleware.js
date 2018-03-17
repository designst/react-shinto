import httpProxyMiddleware from 'http-proxy-middleware';

import paths from '../../config/paths';

const proxySetting = require(paths.appPackageJson).proxy;

const setAuthorizationHeader = (proxyReq) => {
  if (!proxyReq.hasHeader('Authorization')) {
    // Get authorization token from localStorage/sessionStorage/cookie
    const token = null;

    if (token) {
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
  }
};

const handleProxyError = (err, req, res) => {
  res.writeHead(502, {
    'Content-Type': 'text/plain',
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
};

const handleProxyRequest = (proxyReq, req, res) => {
  setAuthorizationHeader(proxyReq);
};

const handleProxyResponse = (proxyRes, req, res) => {

};

const handleProxyRequestWs = (proxyReq, req, socket, options, head) => {

};

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
