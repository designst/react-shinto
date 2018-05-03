import path from 'path';

export default (filename, actionName) => {
  let constantName = path.relative(process.cwd(), filename);

  constantName = constantName.substr(0, constantName.lastIndexOf('.'));

  return path.join('@shinto', constantName, actionName);
};
