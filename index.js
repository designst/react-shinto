/* @flow */

// Allows you to use the full set of ES6 features on server-side (place it before anything else)
require('@babel/polyfill');
// Allows you to precompile ES6 syntax
require('@babel/register');

// Setup global variables for server-side
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SERVER__ = true;

// Run assets require hooks
require('./config/webpack/hooks')();
// Run server
require('./server');
