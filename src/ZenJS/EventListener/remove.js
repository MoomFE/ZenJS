import rtypenamespace from "../../shared/const/rtypenamespace";
import rnothtmlwhite from "../../shared/const/rnothtmlwhite";


/**
 * 事件处理 => 移除事件2: 移除事件
 * @param {Element} elem 需要移除事件的对象
 * @param {Array} types 需要解绑的事件集
 * @param {Function} listener 解绑的事件
 * @param {String} selector 事件委托的选择器
 */
export default function remove( elem, types, listener, selector, mappedTypes ){

  if( !elem.$hasData( 'events' ) ){
    return;
  }

  types = ( types || '' ).match( rnothtmlwhite ) || [ '' ];

  let
    /** 存放当前元素下的所有事件 */
    events = elem.$data( 'events' ),
    /** 事件总数 */
    length = types.length,

    tmp,
    type,
    namespace,
    handlers,
    handlersLength,
    handleOptions;

  while( length-- ){

    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec( types[ length ] ) || [];
    /** 事件名称 */
    type = tmp[ 1 ];

    // 解绑所有事件
    if( !type ){
      for( type in events ){
        remove( elem, type + types[ length ], listener, selector, true );
      }
      continue;
    }

    /** 命名空间 */
    namespace = ( tmp[ 2 ] || '' ).split( '.' ).sort().join( '.' );
    /** 事件集 */
    handlers = events[ type ] || [];
    /** 事件集数量 */
    handlersLength = handlers.length;

    tmp = tmp[ 2 ] &&
          new RegExp( '^' + namespace + '$' );

    while( handlersLength-- ){
      handleOptions = handlers[ handlersLength ];

      if(
        // 检查注入到方法上的 guid 是否相同
        ( !listener || listener.guid === handleOptions.guid ) &&
        // 检查命名空间是否相同
        ( !tmp || tmp.test( handleOptions.namespaceStr ) ) &&
        // 检查事件委托
        selector
          // 允许所有绑定的事件通过, 不管有没有事件委托
          ? selector === '**' ? true
            // 允许所有有事件委托的事件通过
            : selector === '*' ? !!handleOptions.selector
              // 事件委托必须相同才能通过
              : selector === handleOptions.selector
          // 允许所有没事件委托的事件通过
          : !handleOptions.selector
      ){
        // 移除事件
        elem.removeEventListener( type, handleOptions.handle );
        // 移除事件缓存
        handlers.splice( handlersLength, 1 );
      }
    }

    if( handlers.length === 0 ){
      delete events[ type ];
    }
  }
}