import rtypenamespace from '../../shared/const/rtypenamespace';
import concat from '../../shared/global/Array/prototype/concat';

import isEmptyObject from '../../shared/util/isEmptyObject';
import Zen from '../../shared/global/Zen/index';

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
    /** 事件总数 */
    length = types.length,

    tmp,
    type,
    handleOptions;

  while( length-- ){

    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec( types[ length ] ) || [ '' ];
    /** 事件名称 */
    type = tmp[ 1 ];

    if( !type ){
      continue;
    }

    
    /** 该事件的所有参数 */
    handleOptions = {
      elem,
      type,
      listener,
      selector,
      options,
      /** 命名空间 */
      namespace: ( tmp[ 2 ] || '' ).split( '.' ).sort(),
      handle: function(){
        return Zen.event.dispatch.apply( handleOptions, arguments );
      }
    };

    (
      events[ type ] || (
        events[ type ] = []
      )
    ).push( handleOptions );

    if( options.passive ){
      elem.addEventListener( type, handleOptions.handle, options );
    }else{
      elem.addEventListener( type, handleOptions.handle, options.capture || false );
    }

  }

}