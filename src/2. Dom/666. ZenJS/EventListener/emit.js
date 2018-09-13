

/**
 * 事件处理 => 触发事件
 * @param {Element} elem 
 * @param {Array} types 
 * @param {Array} data 
 */
export default function emit( elem, types, data ){

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

      // 检查命名空间是否相同 ( 如果有 )
      if( !rNamespace || rNamespace.test( handleOptions.namespaceStr ) ){
        // 检查事件委托 ( 不触发有事件委托的方法 )
        if( !handleOptions.selector ){
          handleOptions.handle.apply( handleOptions.elem, [ type ].concat( data ) );
        }
      }
    }
  }
}