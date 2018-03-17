# 🥥 React [Shintō](https://de.wikipedia.org/wiki/Shint%C5%8D)

[![Build Status](https://travis-ci.org/designst/react-shinto.svg?branch=master)](https://travis-ci.org/designst/react-shinto)
[![dependencies Status](https://david-dm.org/designst/react-shinto/status.svg)](https://david-dm.org/designst/react-shinto)
[![devDependencies Status](https://david-dm.org/designst/react-shinto/dev-status.svg)](https://david-dm.org/designst/react-shinto?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/designst/react-shinto/badge.svg?branch=master)](https://coveralls.io/github/designst/react-shinto?branch=master)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/designst/react-shinto/master/LICENSE)

Take the best of the best and make it even better.

## Features

- [React](https://reactjs.org/) for building user interfaces.
- [Redux](https://redux.js.org/)'s futuristic [Flux](https://facebook.github.io/flux/) impelementation.
- [Express](http://expressjs.com/) web server.
- [Webpack 4](https://webpack.js.org/) for bundling support.


## Getting Started

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/designst/react-shinto.git
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

