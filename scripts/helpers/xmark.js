import chalk from 'chalk';

/**
 * Adds mark cross symbol
 */
function addXMark(callback) {
  process.stdout.write(chalk.red(' ✘'));
  if (callback) callback();
}

module.exports = addXMark;
