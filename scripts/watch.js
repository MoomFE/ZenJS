const { configuration } = require('./config');


module.exports = configuration.filter( config => {
  return /\.(common|esm|min)\./.test( config.output.file ) === false;
});