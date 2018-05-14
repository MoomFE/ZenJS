import define from '../../shared/util/defineValue';

/**
 * 页面完全加载完毕后执行传入代码
 * -- -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 window, 比如 iframe 的 window
 * @param {Function} func 需要执行的方法
 * @param {Object} data 需要传入方法的数据
 */
export default function $ready( func, data ){
  if( this.document.readyState === 'complete' ) return func.apply( this, data );
  this.addEventListener( 'load', function callback( event ){
    this.removeEventListener( event.type, callback );
    func.apply( this, data );
  });
}

define( window, '$ready', $ready );