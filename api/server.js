import http from 'http';
import chalk from 'chalk';
import Debug from 'debug';
import express from 'express';

import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';

const host = process.env.API_HOST || process.env.SHINTO_API_HOST || '0.0.0.0';
const port =
  parseInt(process.env.API_PORT, 10) || parseInt(process.env.SHINTO_API_PORT, 10) || 8000;
const protocol =
  process.env.API_HTTPS === 'true' || process.env.SHINTO_API_HTTPS === 'true' ? 'https' : 'http';

const app = express();
const server = http.createServer(app);

const debug = new Debug('shinto:api:server');

choosePort(host, port)
  .then(appPort => {
    if (appPort == null) {
      return console.error(chalk.red('No port found.'));
    }

    const urls = prepareUrls(protocol, host, port);

    server.listen(appPort, host, err => {
      if (err) {
        return console.error(chalk.red(err.message));
      }

      app.use('/api/auth/check', (req, res) => {
        debug('/api/auth/check');
        res.status(200).send('ok');
      });

      app.use('/api/auth/login', (req, res) => {
        debug('/api/auth/login');
        res.status(200).send({
          token: 'authToken',
        });
      });

      app.use('/api', (req, res) => {
        debug('/api');
        res.status(200).send('API');
      });

      if (process.env.SHINTO_OPEN_BROWSER === 'true') {
        openBrowser(urls.localUrlForBrowser);
      }

      return null;
    });

    return null;
  })
  .catch(err => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }

    process.exit(1);
  });
