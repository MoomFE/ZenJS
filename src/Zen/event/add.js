import { rtypenamespace } from "../../shared";
import isEmptyObject from '../../shared/util/isEmptyObject';
import Zen from "../../shared/zen";

/**
 * 事件处理 => 添加事件3: 绑定事件
 * @param {Element} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 */
export default function add( elem, types, selector, listener, options ){

  let
    /** 存放当前元素下的所有事件 */
    events = elem.$data( 'events', {}, true ),
    /** 事件列表下的命名空间 */
    eventsNamespace = isEmptyObject( options ) ? 'default' : Object.keys( options ).sort().join(','),
    /** 事件总数 */
    length = types.length;

  while( length-- ){
    let
      /** 分离事件名称和命名空间 */
      tmp = rtypenamespace.exec( types[ length ] ) || [ '' ],
      /** 事件名称 */
      type = tmp[ 1 ];

    if( !type ){
      continue;
    }

    
    let
      /** 命名空间 */
      namespace = ( tmp[ 2 ] || '' ).split( '.' ).sort(),
      /** 该事件的所有参数 */
      handleOptions = {
        type,
        listener,
        selector,
        namespace,
        options
      },
      /** 当前元素下当前事件当前命名空间下的所有事件的参数 */
      handlers = events[ type ] || ( events[ type ] = {} );

    if( handlers[ eventsNamespace ] ){
      handlers = handlers[ eventsNamespace ];
    }else{
      handlers = handlers[ eventsNamespace ] = [];
      handlers.delegateCount = 0;
      handlers.handle = function( event ){
        return Zen.event.dispatch.apply( this, arguments );
      }

      if( options.passive ){
        elem.addEventListener( type, handlers.handle, options );
      }else{
        elem.addEventListener( type, handlers.handle, options.capture || false );
      }
    }

    if( selector ){
      handlers.splice( handlers.delegateCount++, 0, handleOptions );
    }else{
      handlers.push( handleOptions );
    }
  }

}