import hpp from 'hpp';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

const isProd = process.env.NODE_ENV === 'production';

module.exports = (app, urls, port) => {
  // Prevent HTTP parameter pollution.
  app.use(hpp());
  // Use helmet to secure Express with various HTTP headers
  app.use(helmet());
  // Use cookie-parser
  app.use(cookieParser());

  // Use for http request debug (show errors only)
  app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
  app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

  if (isProd) {
    const addProdMiddleware = require('./addProdMiddleware');
    const webpackConfig = require('../../config/webpack/webpack.prod.babel');
    addProdMiddleware(app, webpackConfig);
  } else {
    const webpackConfig = require('../../config/webpack/webpack.dev.babel');
    const addDevMiddleware = require('./addDevMiddleware');
    addDevMiddleware(app, urls, port, webpackConfig);
  }
};
