/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */
function namespaceHandler(
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

    if( handler.type === 'check' ){
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
     * 
     */
    self: {
      type: 'check',
      handler( elem, type, namespace, event ){
        if( event.target !== event.currentTarget ){
          return false;
        }
      }
    }
  }
};


/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */
handlers.add.once = handlers.add.one = {
  type: 'check',
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



export default namespaceHandler;