const ignoreCaseContains = (source, target) => {
  if (!source || !target) {
    return false;
  }
  return source.toLowerCase().indexOf(target.toLowerCase()) > -1;
};

const replaceEnter = (str) => {
  return str.replace(/↵/g, '\n');
}

module.exports = {
  ignoreCaseContains,
  replaceEnter
}