// rollup plugin
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');

// project info
const { title, version, author } = require('../package.json');


const banner =
`/*!
 * ${ title } v${ version }
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018 ${ author }
 * Released under the MIT License.
 */
`;


module.exports = {
  input: 'src/build/index.slim.js',
  output: {
    file: 'dist/slim/zen.slim.js',
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
        return code.replace( /\s*=\s*void 0(,|;)/g, '$1' );
      }
    }
  ]
};