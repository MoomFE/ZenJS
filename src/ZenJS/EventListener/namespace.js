/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} events 当前元素下的所有事件
 */
function namespaceHandler( name, namespace, elem, type, events ){
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
      if( handler.handler( elem, type, namespace, events ) === false ){
        return false;
      }
    }
  }
  
}

const handlers = {
  add: {
    once: {
      type: 'check',
      handler( elem, type, namespace, events ){
        // 没有绑定过事件
        if( !( events = events[ type ] ) ) return;

        let i = 0,
            len = events.length;

        for( ; i < len; i++ ){
          // 如果绑定了相同的命名空间的事件, 则当前事件不会再进行绑定
          if( namespace.$equals( events[ i ].namespace ) ){
            return false;
          }
        }
      }
    }
  }
};


export default namespaceHandler;