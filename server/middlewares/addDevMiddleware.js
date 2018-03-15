import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createCompiler } from 'react-dev-utils/WebpackDevServerUtils';

import paths from '../../config/paths';

const useYarn = fs.existsSync(paths.yarnLockFile);

module.exports = (app, name, urls, webpackConfig) => {
  const compiler = createCompiler(webpack, webpackConfig, name, urls, useYarn);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    quiet: true, // Turn it on for friendly-errors-webpack-plugin
    noInfo: true,
    stats: 'minimal',
    serverSideRender: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: false // Turn it off for friendly-errors-webpack-plugin
  }));
};
