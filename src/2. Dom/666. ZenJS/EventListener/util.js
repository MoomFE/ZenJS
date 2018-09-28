import rtypenamespace from "../../../shared/const/rtypenamespace";


export function init( elem, types, whileFn, whileEndFn ){

  /** 存放当前元素下的所有事件 */
  const events = elem.$data( 'events', {}, true );

  /** 事件总数 */
  let length = types.length;

  let tmp,
      type,
      namespace, rNamespace,
      handlers, handlersLength;

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
      whileFn(
        handlers[ handlersLength ],
        rNamespace,
        type,
        handlers,
        handlersLength
      );
    }

    whileEndFn && whileEndFn(
      handlers, events, type
    );
  }
}

/**
 * 所有事件分组的存储
 */
export const GROUPS = {
  // group1: [
  //   handleOptions1,
  //   handleOptions2
  // ]
};

/**
 * 事件分组主分组
 */
export const MAINGROUPS = {
  // group: [
  //   handleOptions1,
  //   handleOptions2,
  //   handleOptions3,
  //   handleOptions4
  // ]
};