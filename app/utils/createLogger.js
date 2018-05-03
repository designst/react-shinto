import path from 'path';
import Debug from 'debug';

export default filename => {
  let loggerName = path.relative(process.cwd(), filename);

  loggerName = loggerName.substr(0, loggerName.lastIndexOf('.'));
  loggerName = loggerName.replace(new RegExp(path.sep, 'g'), ':');
  loggerName = loggerName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

  return new Debug(`shinto:${loggerName}`);
};
