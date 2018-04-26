/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

import path from 'path';
import webpack from 'webpack';
import uniq from 'lodash/uniq';
import pullAll from 'lodash/pullAll';

import paths from '../paths';
import getClientEnvironment from '../env';

const pkg = require(paths.appPackageJson);

if (!pkg.dllPlugin) {
  process.exit(0);
}

const { dllPlugin } = pkg;
const outputPath = path.join(paths.appPublic, dllPlugin.name);

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const getEntry = () => {
  if (dllPlugin.dlls) {
    return dllPlugin.dlls;
  }

  const { exclude, include } = dllPlugin;
  const dependencyNames = Object.keys(pkg.dependencies);
  const includeDependencies = uniq(dependencyNames.concat(include));

  return {
    reactShintoDeps: pullAll(includeDependencies, exclude),
  };
};

module.exports = {
  mode: 'development',
  context: process.cwd(),
  devtool: 'eval',
  entry: getEntry(),
  output: {
    path: outputPath,
    library: '[name]',
    filename: '[name].dll.js',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name].json'),
    }),
    new webpack.DefinePlugin({
      ...env.stringified,
      __DEV__: process.env.NODE_ENV === 'development',
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],
  performance: {
    hints: false,
  },
};
