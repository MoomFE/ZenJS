import rnothtmlwhite from "../../shared/const/rnothtmlwhite";
import rtypenamespace from "../../shared/const/rtypenamespace";


/**
 * 触发绑定在元素上的事件( 只触发事件 )
 * @param {Element} elem 
 * @param {String} types 
 */
export default function emit( elem, types, data ){

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

    if( !type ){
      continue;
    }

    /** 命名空间 */
    namespace = ( tmp[ 2 ] || '' ).split( '.' ).sort().join();
    /** 事件集 */
    handlers = events[ type ] || [];
    /** 事件集数量 */
    handlersLength = handlers.length;

    tmp = tmp[ 2 ] &&
          new RegExp( '^' + namespace + '$' );
    
    while( handlersLength-- ){
      handleOptions = handlers[ handlersLength ];

      // 检查命名空间是否相同 ( 如果有 )
      if( !tmp || tmp.test( handleOptions.namespaceStr ) ){
        // 检查事件委托
        if( !handleOptions.selector ){
          handleOptions.handle.apply( null, data.$unshift( type ) );
        }
      }
    }
  }
}