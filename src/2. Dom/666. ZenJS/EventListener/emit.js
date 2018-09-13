import { init } from "./util";


/**
 * 事件处理 => 触发事件
 * @param {Element} elem 
 * @param {Array} types 
 * @param {Array} data 
 */
export default function emit( elem, types, data ){
  init(
    elem, types,
    function( handleOptions, rNamespace, type ){
      // 检查命名空间是否相同 ( 如果有 )
      if( !rNamespace || rNamespace.test( handleOptions.namespaceStr ) ){
        // 检查事件委托 ( 不触发有事件委托的方法 )
        if( !handleOptions.selector ){
          handleOptions.handle.apply( handleOptions.elem, [ type ].concat( data ) );
        }
      }
    }
  );
}