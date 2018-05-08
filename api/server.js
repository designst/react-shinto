import http from 'http';
import chalk from 'chalk';
import Debug from 'debug';
import express from 'express';

import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';

import '../config/env';

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

      app.use(express.json());
      app.use(express.urlencoded());

      app.use('/api/auth/check', (req, res) => {
        const { token } = req.body;

        debug('/api/auth/check: %s', token);

        if (token === 'secret') {
          debug('/api/auth/check: 200');
          return res.status(200).send('Authorized');
        }

        debug('/api/auth/check: 403');
        return res.status(401).send('Unauthorized');
      });

      app.use('/api/auth/login', (req, res) => {
        const { username, password } = req.body;

        debug('/api/auth/login: %s', username);

        if (username === 'john' && password === 'doe') {
          const token = 'secret';

          return res
            .cookie(process.env.SHINTO_AUTH_TOKEN_COOKIE, token)
            .status(200)
            .send({
              token,
            });
        }

        return res.status(401).send('Unauthorized');
      });

      app.use('/api/auth/logout', (req, res) => {
        debug('/api/auth/logout');

        return res
          .clearCookie(process.env.SHINTO_AUTH_TOKEN_COOKIE)
          .status(200)
          .send('Unauthorized');
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
