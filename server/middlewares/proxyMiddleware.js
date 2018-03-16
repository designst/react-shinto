import { prepareProxy } from 'react-dev-utils/WebpackDevServerUtils';

import paths from '../../config/paths';
import httpProxy from "http-proxy";

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

module.exports = (app, server) => {
  const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

  const proxy = httpProxy.createProxy(proxyConfig);

  proxy.on('error', (error, req, res) => {
    res.writeHead(502, {
      'Content-Type': 'text/plain',
    });

    res.end('Proxy Error');
  });

  proxy.on('proxyReq', setAuthorizationHeader);

  app.use('/api', proxy.web);
  server.on('upgrade', proxy.ws);

  return proxy;
};
