import Zen from '../../../../var/Zen';
import rtypenamespace from '../../../../var/regexp/rtypenamespace';

/**
 * 添加事件的处理器
 * @param {Element} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {Function} handler 绑定的事件
 * @param {Object} options 事件绑定参数
 * @param {String} selector 事件委托的选择器
 */
export default function add( elem, types, handler, options, selector ){

  let elemData = elem.$data(),
      guid,
      events,
      eventHandle,
      typesLength = types.length;
  
  guid = handler.guid || (
    handler.guid = Zen.guid
  );

  events = elemData.events || (
    elemData = {}
  );

  eventHandle = elemData.handle || (
    elemData.handle = eventHandleFn.bind( elem )
  );

  while( typesLength-- ){

    // 尝试分离事件和命名空间
    // 'event.a.b' => [ 'event.a.b', 'event', 'a.b' ]
    let tmp = rtypenamespace.exec( type[ typesLength ] ) || [],
        origType,
        type = origType = tmp[ 1 ],
        namespaces,
        special,
        handleObj,
        handlers;

    if( !type ){
      continue;
    }

    // 取出命名空间
    // 'a.b' => [ 'a', 'b' ]
    namespaces = ( tmp[ 2 ] || '' ).split( '.' ).sort();

    // 兼容性处理
    special = Zen.event.special[ type ] || {};
    type = ( selector ? special.delegateType : special.bindType ) || type;
    special = Zen.event.special[ type ] || {};

    // 创建事件处理对象
    // 这里保存了事件相关的各种属性
    handleObj = Object.assign({
      type,
      origType,
      options,
      handler,
      guid,
      selector,
      needsContext: selector && needsContext.test( selector ),
      namespace: namespaces.join( '.' )
    }, /* handleObjIn */ );

  // 针对当前事件类型, 初始化事件处理队列, 如果是第一次使用, 则执行初始化
  if( !( handlers = events[ type ] ) ){
    handlers = events[ type ] = [];
    handlers.delegateCount = 0;

    // 可能不采用 jQuery 这种方式, 因为不支持 passive
  }


  }
}

const needsContext = /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i;

function eventHandleFn( event ){
 return typeof Zen !== 'undefined' && Zen.event.triggered !== event.type
          ? Zen.event.dispatch( this, arguments )
          : undefined;
}