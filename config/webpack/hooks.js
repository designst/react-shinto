/* @flow */

/* Require hooks for server-side */

import path from 'path';
import sass from 'node-sass';

import paths from '../paths';

module.exports = () => {
  // CSS modules
  require('css-modules-require-hook')({
    // Must use the same pattern with your webpack config
    generateScopedName: '[name]__[local]__[hash:base64:5]',
    extensions: ['.css', '.scss', '.sass'],
    prepend: [require('autoprefixer')],
    preprocessCss: (data, filename) =>
      sass.renderSync({
        data: data.replace('~', `${paths.appNodeModules}/`),
        file: filename,
      }).css,
    // Must be the same with the "context" of webpack LoaderOptionsPlugin
    // see here: https://github.com/css-modules/css-modules-require-hook/issues/86
    rootDir: path.resolve(process.cwd(), 'app'),
    devMode: __DEV__,
  });

  // Images
  require('asset-require-hook')({
    extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp'],
    limit: 10240,
  });

  // Fonts
  require('asset-require-hook')({
    extensions: ['woff', 'woff2', 'ttf', 'eot', 'svg'],
    limit: 10240,
  });
};
