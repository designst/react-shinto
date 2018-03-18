/* eslint-disable */
/* @flow */

import http from 'http';
import chalk from 'chalk';
import express from 'express';

import {
  choosePort,
  prepareUrls,
} from 'react-dev-utils/WebpackDevServerUtils';
import openBrowser from 'react-dev-utils/openBrowser';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';

import paths from '../config/paths';
import proxyMiddleware from './middlewares/proxyMiddleware';
import frontendMiddleware from './middlewares/frontendMiddleware';

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

const app = express();
const server = http.createServer(app);

choosePort(host, port)
  .then(port => {
    if (port == null) {
      return console.error(chalk.red('No port found.'));
    }

    const urls = prepareUrls(protocol, host, port);

    // Proxy Middleware
    proxyMiddleware(app, server);
    // Frontend Middleware
    frontendMiddleware(app, urls, port);

    server.listen(port, host, (err) => {
      if (err) {
        return console.error(chalk.red(err.message));
      }

      openBrowser(urls.localUrlForBrowser);
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }

    process.exit(1);
  });
