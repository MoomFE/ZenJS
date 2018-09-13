import rtypenamespace from "../../../shared/const/rtypenamespace";
import RegExp from "../../../shared/global/RegExp/index";
import { removeEventListener } from "../../../shared/const/event";


/**
 * 事件处理 => 移除事件
 * @param {Element} elem 
 * @param {Array} types 
 * @param {Function} listener 
 * @param {String} selector 
 */
export default function remove( elem, types, listener, selector ){
  
  /** 存放当前元素下的所有事件 */
  const events = elem.$data( 'events', {}, true );

  /** 事件总数 */
  let length = types.length;

  let tmp,
      type,
      namespace, rNamespace,
      handlers, handlersLength,
      handleOptions;

  while( length-- ){

    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec( types[ length ] ) || [];

    /** 事件名称 */
    type = tmp[ 1 ];

    if( !type ) continue;

    /** 事件集 */
    handlers = events[ type ] || [];
    /** 事件集数量 */
    handlersLength = handlers.length;

    if( !handlersLength ) continue;

    /** 命名空间 */
    namespace = ( tmp[ 2 ] || '' ).split( '.' ).sort().join( '.' );
    /** 匹配命名空间 */
    rNamespace = tmp[ 2 ] && new RegExp( '^' + namespace + '$' );

    while( handlersLength-- ){
      handleOptions = handlers[ handlersLength ];

      // 检查注入到方法上的 guid 是否相同 ( 如果有 )
      if( !listener || listener.guid === handleOptions.guid ){
        // 检查命名空间是否相同 ( 如果有 )
        if( !rNamespace || rNamespace.test( handleOptions.namespaceStr ) ){
          // 检查事件委托
          if(
            selector
                // 允许所有绑定的事件通过, 不管有没有事件委托
              ? selector === '**' ||
                // 允许所有有事件委托的事件通过
                selector === '*' && handleOptions.selector ||
                // 事件委托必须相同才能通过
                selector === handleOptions.selector
              // 允许所有没事件委托的事件通过
              : !handleOptions.selector
          ){
            // 移除事件
            elem[ removeEventListener ]( type, handleOptions.listener );
            // 移除事件缓存
            handlers.splice( handlersLength, 1 );
          }
        }
      }
    }

    if( !handlers.length ){
      delete events[ type ];
    }
  }
}