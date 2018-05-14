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
const confirmToken = 'confirm';

const apiPath = process.env.SHINTO_PROXY_API_PATH;

const checkEndpoint = `${apiPath}${process.env.SHINTO_AUTH_CHECK_API_ENDPOINT}`;

const loginEndpoint = `${apiPath}${process.env.SHINTO_AUTH_LOGIN_API_ENDPOINT}`;
const logoutEndpoint = `${apiPath}${process.env.SHINTO_AUTH_LOGOUT_API_ENDPOINT}`;

const registerEndpoint = `${apiPath}${process.env.SHINTO_AUTH_REGISTER_API_ENDPOINT}`;
const registerConfirmEndpoint = `${apiPath}${
  process.env.SHINTO_AUTH_REGISTER_CONFIRM_API_ENDPOINT
}`;

const passwordChangeEndpoint = `${apiPath}${process.env.SHINTO_AUTH_PASSWORD_CHANGE_API_ENDPOINT}`;

const passwordResetEndpoint = `${apiPath}${process.env.SHINTO_AUTH_PASSWORD_RESET_API_ENDPOINT}`;
const passwordResetConfirmEndpoint = `${apiPath}${
  process.env.SHINTO_AUTH_PASSWORD_RESET_CONFIRM_API_ENDPOINT
}`;

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

      // Check Endpoint
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

      // Login Endpoint
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

      // Logout Endpoint
      app.use(logoutEndpoint, (req, res) => {
        debug(logoutEndpoint);

        return res
          .clearCookie(process.env.SHINTO_AUTH_TOKEN_COOKIE)
          .status(200)
          .send('Unauthorized');
      });

      // Register Endpoint
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

      // Register Confirm Endpoint
      app.use(registerConfirmEndpoint, (req, res) => {
        const { token } = req.body;

        debug('%s: %s', registerConfirmEndpoint, token);

        if (token === confirmToken) {
          return res.status(200).send({
            token: secretToken,
          });
        }

        return res.status(401).send('Unauthorized');
      });

      // Password Change Endpoint
      app.use(passwordChangeEndpoint, (req, res) => {
        const { oldPassword, newPassword, newPasswordConfirm } = req.body;

        debug(passwordChangeEndpoint);

        if (oldPassword && newPassword === newPasswordConfirm) {
          return res.status(200).send('Authorized');
        }

        return res.status(401).send('Unauthorized');
      });

      // Password Reset Endpoint
      app.use(passwordResetEndpoint, (req, res) => {
        const { email, username } = req.body;

        debug('%s: %s %s', passwordResetEndpoint, email, username);

        if (email || username) {
          return res.status(200).send('Authorized');
        }

        return res.status(401).send('Unauthorized');
      });

      // Password Reset Confirm Endpoint
      app.use(passwordResetConfirmEndpoint, (req, res) => {
        const { token } = req.body;

        debug('%s: %s', passwordResetConfirmEndpoint, token);

        if (token === confirmToken) {
          return res.status(200).send('Authorized');
        }

        return res.status(401).send('Unauthorized');
      });

      // API Endpoint
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
