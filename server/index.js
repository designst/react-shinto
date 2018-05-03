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

import createLogger from 'utils/createLogger';

// Import env to prepare all SHINTO_* env variables
import '../config/env';
import paths from '../config/paths';
import appMiddleware from './middlewares/appMiddleware';
import proxyMiddleware from './middlewares/proxyMiddleware';
import frontendMiddleware from './middlewares/frontendMiddleware';

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const host = process.env.HOST || process.env.SHINTO_HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || parseInt(process.env.SHINTO_PORT, 10) || 3000;
const protocol = process.env.HTTPS === 'true' || process.env.SHINTO_HTTPS === 'true' ?
  'https' :
  'http';

const app = express();
const server = http.createServer(app);
const logger = createLogger(__filename);

choosePort(host, port)
  .then(port => {
    if (port == null) {
      return console.error(chalk.red('No port found.'));
    }

    logger('Prepare Urls');

    const urls = prepareUrls(protocol, host, port);

    // APP Middleware
    logger('Initialize App Middleware');
    appMiddleware(app, urls, port);

    if (process.env.SHINTO_USE_PROXY_MIDDLEWARE === 'true') {
      // Proxy Middleware
      logger('Initialize Proxy Middleware');
      proxyMiddleware(app, server);
    }

    // Frontend Middleware
    logger('Initialize Frontend Middleware');
    frontendMiddleware(app);

    server.listen(port, host, (err) => {
      if (err) {
        return console.error(chalk.red(err.message));
      }

      if (process.env.SHINTO_OPEN_BROWSER === 'true') {
        openBrowser(urls.localUrlForBrowser);
      }
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }

    process.exit(1);
  });
