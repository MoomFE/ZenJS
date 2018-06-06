// rollup plugin
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');

// project info
const { title, version, author } = require('../package.json');


const banner =
`/*!
 * ${ title } v${ version }
 * (c) 2018 ${ author }
 * Released under the MIT License.
 */
`;

const rVoid0 = /\s*=\s*void 0(,|;)/g;

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/zen.js',
    format: 'umd',
    banner,
    name: 'ZenJS'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      '__VERSION__': version
    }),
    {
      name: "remove babel let void 0",
      transformBundle: function( code ){
        return code.replace( rVoid0, '$1' );
      }
    }
  ]
};