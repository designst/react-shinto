import fs from 'fs';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createCompiler } from 'react-dev-utils/WebpackDevServerUtils';

import paths from '../../config/paths';

const { name } = require(paths.appPackageJson);
const useYarn = fs.existsSync(paths.yarnLockFile);

const ngrok = process.env.ENABLE_TUNNEL ? require('ngrok') : false;

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
      stats: 'minimal',
      serverSideRender: true,
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: false, // Turn it off for friendly-errors-webpack-plugin
    }),
  );
};
