import { init } from "./util";


/**
 * 事件处理 => 触发事件
 * @private
 * @param {EventTarget} elem 需要触发事件的对象
 * @param {Array} types 需要触发的事件集
 * @param {Array} data 需要传递到事件回调的参数
 */
export default function emit( elem, types, data ){
  init(
    elem, types,
    function( handleOptions, rNamespace, type ){
      // 检查命名空间是否相同 ( 如果有 )
      if( !rNamespace || rNamespace.test( handleOptions.namespaceStr ) ){
        // 检查事件委托 ( 不触发有事件委托的方法 )
        if( !handleOptions.selector ){
          handleOptions.handler.apply(
            handleOptions.elem, [ type ].concat( data )
          );
        }
      }
    }
  );
}