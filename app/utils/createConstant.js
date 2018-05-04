import path from 'path';

export default (filename, actionName) => {
  let constantName = path.relative(process.cwd(), filename);

  constantName = constantName.substr(0, constantName.lastIndexOf('.'));
  constantName = constantName.toLowerCase();

  return path.join('@shinto', constantName, actionName);
};
