import express from 'express';
import compression from 'compression';

module.exports = (app, name, urls, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || urls.appPublic;

  // Compress all requests
  app.use(compression());

  app.use(publicPath, express.static(outputPath));
};
