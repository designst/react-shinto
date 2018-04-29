const path = require('path');

function getComponentPath(data) {
  let cmpPath = '';
  const parts = data.name.split(path.sep);

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      data.name = part;
    } else {
      cmpPath = path.join(cmpPath, part);
    }
  });

  return cmpPath;
}

module.exports = getComponentPath;
