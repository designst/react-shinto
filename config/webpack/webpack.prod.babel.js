import path from 'path';
import ImageminPlugin from 'imagemin-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import paths from '../paths';
import getClientEnvironment from '../env';

import {
  node,
  resolve,
  getEntry,
  fontRule,
  finalRule,
  imageRule,
  eslintRule,
  scriptRule,
  cssFileRule,
  sassFileRule,
  getCommonPlugins,
} from './parts';

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap =
  process.env.GENERATE_SOURCEMAP === 'true' || process.env.SHINTO_GENERATE_SOURCEMAP === 'true';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? 'source-map' : false,
  // In production, we only want to load the polyfills and the app code.
  entry: getEntry(false, paths.appIndexJs),
  output: {
    // The build folder.
    path: paths.appBuild,
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
      eslintRule(),
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          imageRule(),
          fontRule(),
          scriptRule({
            compact: true,
          }),
          cssFileRule(),
          sassFileRule(),
          finalRule(),
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader (finalRule).
    ],
  },
  plugins: [
    ...getCommonPlugins(env),
    // Plugin to compress images with imagemin
    // Check "https://github.com/Klathmon/imagemin-webpack-plugin" for more configurations
    new ImageminPlugin({
      pngquant: { quality: '95-100' },
    }),
    new MiniCssExtractPlugin({
      sourceMap: true,
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[name].[chunkhash:8].chunk.css',
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: `${publicUrl}/index.html`,
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /webpack-assets\.json$/],
    }),
  ],
  node,
  resolve,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: shouldUseSourceMap,
      }),
      ...(shouldUseSourceMap ? [] : [new OptimizeCSSAssetsPlugin({})]),
    ],
  },
};
