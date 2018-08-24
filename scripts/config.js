const shared = require('./shared');

module.exports = {
  input: 'src/build/index.js',
  output: {
    file: 'dist/zen.js',
    format: 'umd',
    banner: shared.banner
  },
  plugins: shared.plugins
};