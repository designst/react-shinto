// No need to build the DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0);
}

require('shelljs/global');

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const paths = require('../config/paths');

const pkg = require(paths.appPackageJson);
const { name } = pkg.dllPlugin;

const outputPath = path.join(paths.appPublic, name);

/**
 * I use node_modules/lux-dll by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdirp(outputPath);

const dllManifestPath = path.join(outputPath, 'package.json');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!fs.existsSync(dllManifestPath)) {
  fs.writeFileSync(
    dllManifestPath,
    JSON.stringify(
      {
        name,
        private: true,
        author: pkg.author,
        version: pkg.version,
        repository: pkg.repository,
      },
      null,
      2,
    ),
    'utf8',
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
/* eslint-disable-next-line */
exec(
  'cross-env NODE_PATH=./app BUILDING_DLL=true webpack --display-chunks --color --config config/webpack/webpack.dll.babel.js --hide-modules',
);
