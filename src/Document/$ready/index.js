import define from '../../shared/util/defineValue';
import document from '../../shared/global/Document/index';

/**
 * 页面加载完毕后执行传入代码
 * -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 document, 比如 iframe 的 document
 * 
 * @param {Function} func 需要执行的方法
 * @param {Object} data 需要传入方法的数据
 */
export default function $ready( func, data ){
  if( this.readyState === 'complete' || ( this.readyState !== 'loading' && !this.documentElement.doScroll ) ) return func.apply( window, data );
  this.addEventListener( 'DOMContentLoaded', function callback( event ){
    this.removeEventListener( event.type, callback );
    func.apply( window, data );
  });
}

define( document, '$ready', $ready );