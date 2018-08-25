const { build } = require('./shared');


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
      return 'dist/Plugins/cookie/zen.plugin.{}.js'.replace( '{}', name + format );
    })
  ));
}

// Default 版本, 只包含核心代码, 没有 DOM API, 没有安装插件
add( undefined, undefined, 'dist/zen.min.js', 'dist/zen.common.js', 'dist/zen.esm.js' );
// DOM 版本, 包含核心代码及 DOM API, 没有安装插件
add( 'src/build/all.js', 'dist/zen.all.js', 'dist/zen.all.min.js', 'dist/zen.all.common.js', 'dist/zen.all.esm.js' );
// 插件, 需要使用时自主引用
addPlugin( 'src/3. Plugins/cookie/index.js', 'cookie' );


!async function(){
  for( let config of configuration ){
    await build( config );
  }
}();