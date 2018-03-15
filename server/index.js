/* eslint-disable */
/* @flow */

import path from 'path';
import express from 'express';

import openBrowser from 'react-dev-utils/openBrowser';
import clearConsole from 'react-dev-utils/clearConsole';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import {
  choosePort,
  prepareUrls,
} from 'react-dev-utils/WebpackDevServerUtils';

import paths from '../config/paths';
import logger from './logger';
import frontendMiddleware from './middlewares/frontendMiddleware';

const isDev = process.env.NODE_ENV === 'development';
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const app = express();
const ngrok = (isDev && process.env.ENABLE_TUNNEL) ? require('ngrok') : false;

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      return logger.error('No port found.');
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const name = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);

    frontendMiddleware(app, name, urls);

    app.listen(port, HOST, (err) => {
      if (err) {
        return logger.error(err.message);
      }

      if (isInteractive) {
        clearConsole();
      }

      if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
          if (innerErr) {
            return logger.error(innerErr);
          }

          logger.appStarted(port, HOST, url);
        });
      } else {
        logger.appStarted(port, HOST);
      }

      openBrowser(urls.localUrlForBrowser);
    });
  })
  .catch(err => {
    if (err && err.message) {
      logger.error(err.message)
    }

    process.exit(1);
  });
