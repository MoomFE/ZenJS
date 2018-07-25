/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */
function modifiers(
  // Self use
  name,
  namespace,
  // Handler use
  elem,
  type,
  options
){
  // 没有命名空间
  if( namespace.length === 0 ) return;

  const _handlers = handlers[ name ];
  const _namespace = namespace.filter( name => name in _handlers );
  const length = _namespace.length;

  // 没有功能命名空间
  if( length === 0 ) return;

  let i = 0,
      handlerName,
      handler;

  for( ; i < length; i++ ){
    handlerName = _namespace[ i ];
    handler = _handlers[ handlerName ];

    // check
    if( handler.type === undefined ){
      if( handler.handler( elem, type, namespace, options ) === false ){
        return false;
      }
    }
  }

}

const handlers = {
  /**
   * 添加事件时
   */
  add: {},
  /**
   * 触发事件时
   */
  dispatch: {
    /**
     * 当事件是从绑定的元素本身触发时才触发回调
     */
    self: {
      handler( elem, type, namespace, event ){
        if( event.target !== event.currentTarget ){
          return false;
        }
      }
    }
  }
};

const add = handlers.add,
      dispatch = handlers.dispatch;

/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */
add.once = add.one = {
  handler( elem, type, namespace, events ){
    // 没有绑定过事件
    if( !( events = events[ type ] ) ) return;

    let i = 0,
        len = events.length;

    for( ; i < len; i++ )
      // 如果绑定了相同的命名空间的事件, 则当前事件不会再进行绑定
      if( namespace.$equals( events[ i ].namespace ) ){
        return false;
      }
  }
};

/**
 * .ctrl || .shift || .alt || .meta
 * 当按下了对应键盘按键时才触发回调
 */
[ 'ctrl', 'shift', 'alt', 'meta' ].forEach( key => {
  dispatch[ key ] = {
    handler( elem, type, namespace, event ){
      if( !event[ key + 'Key' ] ) return false;
    }
  }
});

/**
 * .left || .middle || .right
 * 当按下了对应鼠标按键时才触发回调
 */
[ 'left', 'middle', 'right' ].forEach(( button, index ) => {
  dispatch[ button ] = {
    handler( elem, type, namespace, event ){
      if( 'button' in event && event.button !== index ) return false;
    }
  };
});



export default modifiers;