import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createCompiler } from 'react-dev-utils/WebpackDevServerUtils';

import paths from '../../config/paths';

const { name } = require(paths.appPackageJson);
const useYarn = fs.existsSync(paths.yarnLockFile);

const ngrok = process.env.ENABLE_TUNNEL ? require('ngrok') : false;

const showWebpackStats = process.env.SHINTO_WEBPACK_SHOW_STATS === 'true';

module.exports = (app, urls, port, webpackConfig) => {
  const compiler = createCompiler(webpack, webpackConfig, name, urls, useYarn);

  if (ngrok) {
    ngrok
      .connect(port)
      .then(ngrokUrl => {
        compiler.plugin('done', () => {
          console.log(`  ${chalk.bold('Ngrok Proxy:')}      ${ngrokUrl}`);
          console.log();
        });
      })
      .catch(err => {
        console.error(chalk.red(err));
      });
  }

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: showWebpackStats ? { colors: true } : 'minimal',
      serverSideRender: true,
    }),
  );

  // Add /public route to serve static files in public app directory
  app.use(path.join(webpackConfig.output.publicPath, 'public'), express.static(paths.appPublic));

  app.use(
    webpackHotMiddleware(compiler, {
      log: false, // Turn it off for friendly-errors-webpack-plugin
    }),
  );
};
