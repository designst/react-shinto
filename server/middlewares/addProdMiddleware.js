import express from 'express';
import compression from 'compression';

import paths from '../../config/paths';

module.exports = (app, webpackConfig) => {
  const publicPath = webpackConfig.output.publicPath || '/';
  const outputPath = webpackConfig.output.path || paths.appBuild;

  // Compress all requests
  app.use(compression());

  app.use(publicPath, express.static(outputPath));
};
