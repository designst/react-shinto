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

const secretToken = 'secret';

const apiPath = process.env.SHINTO_PROXY_API_PATH;
const checkEndpoint = `${apiPath}${process.env.SHINTO_AUTH_CHECK_API_ENDPOINT}`;
const loginEndpoint = `${apiPath}${process.env.SHINTO_AUTH_LOGIN_API_ENDPOINT}`;
const logoutEndpoint = `${apiPath}${process.env.SHINTO_AUTH_LOGOUT_API_ENDPOINT}`;
const registerEndpoint = `${apiPath}${process.env.SHINTO_AUTH_REGISTER_API_ENDPOINT}`;

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
      app.use(express.urlencoded({ extended: true }));

      app.use(checkEndpoint, (req, res) => {
        const { token } = req.body;

        debug('%s: %s', checkEndpoint, token);

        if (token === secretToken) {
          debug('%s: 200', checkEndpoint);
          return res.status(200).send('Authorized');
        }

        debug('%s: 403', checkEndpoint);
        return res.status(401).send('Unauthorized');
      });

      app.use(loginEndpoint, (req, res) => {
        const { username, password } = req.body;

        debug('%s: %s', loginEndpoint, username);

        if (username === 'john' && password === 'doe') {
          const token = secretToken;

          return res
            .cookie(process.env.SHINTO_AUTH_TOKEN_COOKIE, token)
            .status(200)
            .send({
              token,
            });
        }

        return res.status(401).send('Unauthorized');
      });

      app.use(logoutEndpoint, (req, res) => {
        debug(logoutEndpoint);

        return res
          .clearCookie(process.env.SHINTO_AUTH_TOKEN_COOKIE)
          .status(200)
          .send('Unauthorized');
      });

      app.use(registerEndpoint, (req, res) => {
        const { email, username, password, passwordConfirm } = req.body;

        debug('%s: %s', registerEndpoint, email);

        const token = secretToken;

        if (password === passwordConfirm) {
          return res
            .cookie(process.env.SHINTO_AUTH_TOKEN_COOKIE, token)
            .status(200)
            .send({
              token,
              email,
              username,
            });
        }

        return res.status(401).send('Unauthorized');
      });

      app.use(apiPath, (req, res) => {
        debug(apiPath);

        const authorization = req.get('authorization');

        if (authorization === `${process.env.SHINTO_PROXY_API_AUTH_HEADER} ${secretToken}`) {
          return res.status(200).send('Authorized');
        }

        return res.status(403).send('Unauthorized');
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
