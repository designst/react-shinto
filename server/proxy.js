import httpProxy from 'http-proxy';

const setAuthorizationHeader = (proxyReq) => {
  if (!proxyReq.hasHeader('Authorization')) {
    // Get authorization token from localStorage/sessionStorage/cookie
    const token = null;

    if (token) {
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
  }
};

module.exports = (proxyConfig) => {
  const proxy = httpProxy.createProxy(proxyConfig);

  proxy.on('error', (error, req, res) => {
    res.writeHead(502, {
      'Content-Type': 'text/plain',
    });

    res.end('Proxy Error');
  });

  proxy.on('proxyReq', setAuthorizationHeader);

  return proxy;
};
