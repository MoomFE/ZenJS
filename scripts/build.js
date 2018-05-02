const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { title, version, author } = require('../package.json');

const banner =
`/*!
 * ${ title } v${ version }
 * (c) 2018 ${ author }
 * Released under the MIT License.
 */
`;


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    banner,
    name: 'Zen'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}