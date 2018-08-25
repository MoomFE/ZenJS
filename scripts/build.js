const { build } = require('./shared');


const configuration = [
  // 只包含核心代码, 没有 DOM API, 没有安装插件
  {}, {
    output: {
      file: 'dist/zen.min.js'
    }
  }, {
    output: {
      file: 'dist/zen.common.js',
      format: 'cjs'
    }
  }, {
    output: {
      file: 'dist/zen.esm.js',
      format: 'es'
    }
  },
  // 包含核心代码及 DOM API, 没有安装插件
  {
    input: 'src/build/all.js',
    output: {
      file: 'dist/zen.all.js'
    }
  }, {
    input: 'src/build/all.js',
    output: {
      file: 'dist/zen.all.min.js'
    }
  }, {
    input: 'src/build/all.js',
    output: {
      file: 'dist/zen.all.common.js',
      format: 'cjs'
    }
  }, {
    input: 'src/build/all.js',
    output: {
      file: 'dist/zen.all.esm.js',
      format: 'es'
    }
  }
  // 插件, 需要使用时自主引用
];

!async function(){
  for( let config of configuration ){
    await build( config );
  }
}();