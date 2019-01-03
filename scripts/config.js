// rollup plugin
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');
const zlib = require('zlib');
const fs = require('fs');
const extend = require('extend');
const readmePath = __dirname.replace( /scripts$/, 'README.md' );
// project info
const { title, version, author } = require('../package.json');

const banner =
`/*!
 * ${ title } v${ version }
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018-present ${ author }
 * Released under the MIT License.
 */
`;

function getSize( code ){
  return ( code.length / 1024 ).toFixed( 2 ) + 'kb';
}

const defaultConfig = {
  input: 'src/build/index.js',
  output: {
    file: 'dist/zen.js',
    format: 'umd',
    name: 'ZenJS',
    banner
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      __VERSION__: version
    }),
    {
      name: 'Compressed code',
      transformBundle( code, config ){
        const isMinify = /min\.js$/.test( config.file );

        if( isMinify ){
          const minify = uglify.minify( code );

          if( minify.error ){
            code = '';
            console.error(
              '\n******************************************************************'+
              `\n* Minify ERROR: ${ minify.error.message }` +
              `\n* Line: ${ minify.error.line }` +
              `\n* Col: ${ minify.error.col }` +
              '\n******************************************************************'
            );
          }else{
            code = banner + '\n' + minify.code;
          }
        }

        return code;
      }
    },
    {
      name: 'Write the file size to the README',
      transformBundle( code, config ){
        const file = config.file;
        const name = file.replace( /^dist\//, '' );
        const rReadmeSearch = new RegExp(`(\\|\\s${ name }\\s+\\|\\s)[0-9\\.\\skb]+(\\s\\|\\s)[0-9\\.\\skb]+(\\s\\|)`)
        const size = getSize( code );
        const gzipSize = getSize( zlib.gzipSync( code ) );

        fs.writeFileSync(
          readmePath,
          fs.readFileSync( readmePath, 'utf-8' )
            .replace( rReadmeSearch, `$1${ size }$2${ gzipSize }$3` ),
          'utf-8'
        );

        return code;
      }
    }
  ]
};

const configuration = [];

function add( input, umd, umd_min, cjs, es ){
  configuration.push(
    { input, output: { file: umd } },
    { input, output: { file: umd_min } },
    { input, output: { file: cjs, format: 'cjs' } },
    { input, output: { file: es, format: 'es' } }
  );
}

function addPlugin( input, name ){
  add.apply( null, [ input ].concat(
    [ '', '.min', '.common', '.esm' ].map( format => {
      return 'dist/plugins/cookie/zen.plugin.{}.js'.replace( '{}', name + format );
    })
  ));
}


// Default 版本, 只包含核心代码, 没有 DOM API, 没有安装插件
add( undefined, undefined, 'dist/zen.min.js', 'dist/zen.common.js', 'dist/zen.esm.js' );
// DOM 版本, 包含核心代码及 DOM API, 没有安装插件
add( 'src/build/fat.js', 'dist/zen.fat.js', 'dist/zen.fat.min.js', 'dist/zen.fat.common.js', 'dist/zen.fat.esm.js' );
// 插件, 需要使用时自主引用
addPlugin( 'src/3. plugins/cookie/index.js', 'cookie' );

configuration.forEach(( config, index ) => {
  configuration[ index ] = extend( true, {}, defaultConfig, config );
});


// 用于自动修正 README 内 CDN 的版本
fs.writeFileSync(
  readmePath,
  fs.readFileSync( readmePath, 'utf-8' )
    .replace( /(@moomfe\/zenjs@)([0-9\.]+?)(-beta([0-9\.]+?))?\//g, `$1${ version }/` ),
  'utf-8'
);


module.exports = {
  defaultConfig,
  configuration,
  getSize
};