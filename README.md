# 🥥 React [Shintō](https://de.wikipedia.org/wiki/Shint%C5%8D)

[![Build Status](https://travis-ci.org/react-shinto/react-shinto.svg?branch=master)](https://travis-ci.org/react-shinto/react-shinto)
[![dependencies Status](https://david-dm.org/react-shinto/react-shinto/status.svg)](https://david-dm.org/react-shinto/react-shinto)
[![devDependencies Status](https://david-dm.org/react-shinto/react-shinto/dev-status.svg)](https://david-dm.org/react-shinto/react-shinto?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/react-shinto/react-shinto/badge.svg?branch=master)](https://coveralls.io/github/react-shinto/react-shinto?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/react-shinto/react-shinto/master/LICENSE)

Take the best of the best and make it even better.

## Features

- [React](https://reactjs.org/) for building user interfaces.
- [Redux](https://redux.js.org/)'s futuristic [Flux](https://facebook.github.io/flux/) impelementation.
- [Express](http://expressjs.com/) web server.
- [Webpack 4](https://webpack.js.org/) for bundling support.
- [Prettier](https://prettier.io/) opinionated code formatter.


## Getting Started

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/react-shinto/react-shinto.git
   cd react-shinto
   ```

2. Install the required dependencies:
   ```bash
   yarn install
   ```
3. Build application and run production server:
   ```bash
   yarn start:production
   ```
4. Now the application should be running at http://localhost:8080/

## Script Commands

| yarn <script>      | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `start`            | Run the application on the development server at `http://localhost:3000` with Hot Module Replacement [HMR](https://webpack.js.org/concepts/hot-module-replacement/) enabled. |
| `start:production` | Bundle files to `./build` and run it on the production server at `http://localhost:8080`. |
| `lint`             | Lint all `.js` `.css` and `.scss` files.                     |

## Known Issues

- react-dev-utils causes a deprecation warning like *DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead*.

  To show the deprecation trace run node with `--trace-deprecation`.

