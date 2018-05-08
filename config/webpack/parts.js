import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import eslintFormatter from 'react-dev-utils/eslintFormatter';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import paths from '../paths';

const pkg = require(paths.appPackageJson);

const { dllPlugin } = pkg;

const outputPath = path.join(paths.appPublic, dllPlugin.name);

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap =
  process.env.GENERATE_SOURCEMAP === 'true' || process.env.SHINTO_GENERATE_SOURCEMAP === 'true';

export const getEntry = (isDev, index) => {
  // We ship a few polyfills by default:
  const entry = [require.resolve('@babel/polyfill')];

  if (isDev) {
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  // Finally, this is your app's code:
  entry.push(index);
  // We include the app code last so that if there is a runtime error during
  // initialization, it doesn't blow up the WebpackDevServer client, and
  // changing JS code would still trigger a refresh.

  return entry;
};

export const eslintRule = options => ({
  // First, run the linter.
  // It's important to do this before Babel processes the JS.
  test: /\.(js|jsx|mjs)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: eslintFormatter,
        eslintPath: require.resolve('eslint'),
        ...options,
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: paths.appSrc,
});

export const imageRule = options => ({
  // "url" loader works like "file" loader except that it embeds assets
  // smaller than specified limit in bytes as data URLs to avoid requests.
  // A missing `test` is equivalent to a match.
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  // Any image below or equal to 10K will be converted to inline base64 instead
  loader: require.resolve('url-loader'),
  options: {
    limit: 10240,
    name: '[name].[hash:8].[ext]',
    ...options,
  },
});

export const fontRule = options => ({
  test: /\.(eot|svg|otf|ttf|woff2?)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10240,
    name: '[name].[hash:8].[ext]',
    ...options,
  },
});

export const scriptRule = options => ({
  // Process JS with Babel.
  test: /\.(js|jsx|mjs)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-flow',
      '@babel/preset-react',
      '@babel/preset-es2015',
      [
        '@babel/preset-stage-0',
        {
          decoratorsLegacy: true,
        },
      ],
    ],
    ...options,
  },
});

export const cssRule = options => ({
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        ...options,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
    },
  ],
});

export const cssFileRule = () => ({
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: true,
        sourceMap: shouldUseSourceMap,
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    },
  ],
});

export const sassRule = options => ({
  test: /\.(scss|sass)$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
    },
    {
      loader: require.resolve('postcss-loader'),
    },
    {
      loader: require.resolve('sass-loader'),
      options,
    },
  ],
});

export const sassFileRule = () => ({
  test: /\.(scss|sass)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css',
      options: {
        minimize: true,
        sourceMap: shouldUseSourceMap,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss',
      options: {
        sourceMap: shouldUseSourceMap,
      },
    },
    {
      loader: 'sass',
      options: {
        sourceMap: shouldUseSourceMap,
        outputStyle: 'expanded',
        sourceMapContents: shouldUseSourceMap,
      },
    },
  ],
});

export const finalRule = options => ({
  // "file" loader makes sure those assets get served by WebpackDevServer.
  // When you `import` an asset, you get its (virtual) filename.
  // In production, they would get copied to the `build` folder.
  // This loader doesn't use a "test" so it will catch all modules
  // that fall through the other loaders.

  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash].[ext]',
    ...options,
  },
});

export const resolve = {
  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebookincubator/create-react-app/issues/253
  modules: ['node_modules', paths.appNodeModules].concat(
    // It is guaranteed to exist because we tweak it in `env.js`
    process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebookincubator/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    app: paths.appSrc,
    public: paths.appPublic,

    components: `${paths.appSrc}/components`,
    config: `${paths.appSrc}/config`,
    containers: `${paths.appSrc}/containers`,
    providers: `${paths.appSrc}/providers`,
    utils: `${paths.appSrc}/utils`,
  },
  plugins: [
    // Prevents users from importing files from outside of app/ (or node_modules/).
    // This often causes confusion because we only process files within app/ with babel.
    // To fix this, we prevent you from importing files out of app/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
  ],
};

// Some libraries import Node modules but don't use them in the browser.
// Tell Webpack to provide empty mocks for them so importing them works.
export const node = {
  fs: 'empty',
  vm: 'empty',
  net: 'empty',
  tls: 'empty',
  dgram: 'empty',
  child_process: 'empty',
  __dirname: true,
  __filename: true,
};

export const getCommonPlugins = env => [
  new ManifestPlugin({
    fileName: paths.appAssets,
    filter: file => file.isInitial,
    writeToFileEmit: true,
  }),
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
  // It is absolutely essential that NODE_ENV was set to production here.
  // Otherwise React will be compiled in the very slow development mode.
  new webpack.DefinePlugin({
    ...env.stringified,
    __DEV__: process.env.NODE_ENV === 'development',
    __CLIENT__: true,
    __SERVER__: false,
  }),
  // Moment.js is an extremely popular library that bundles large locale files
  // by default due to how Webpack interprets its code. This is a practical
  // solution that requires the user to opt into importing specific locales.
  // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
  // You can remove this if you don't use Moment.js:
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used. Otherwise the CommonsChunkPlugin
 * will be used.
 *
 */
export const dependencyHandlers = () => {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL) {
    return [];
  }

  // If the package.json does not have a dllPlugin property, use the CommonsChunkPlugin
  if (!dllPlugin) {
    return [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
      }),
    ];
  }

  // const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/react-shinto-dll');

  /**
   * If DLLs aren't explicitly defined, we assume all production dependencies listed in package.json
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   */
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(outputPath, 'reactShintoDeps.json');

    if (!fs.existsSync(manifestPath)) {
      console.log('The DLL manifest is missing. Please run `yarn build:dll`');
      process.exit(0);
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath), // eslint-disable-line global-require
      }),
    ];
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map(name =>
    path.join(outputPath, `/${name}.json`),
  );

  return dllManifests.map(manifestPath => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        console.log(
          `The following Webpack DLL manifest is missing: ${path.basename(manifestPath)}`,
        );
        console.log(`Expected to find it in ${outputPath}`);
        console.log('Please run: yarn build:dll');

        process.exit(0);
      }
    }

    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath), // eslint-disable-line global-require
    });
  });
};
