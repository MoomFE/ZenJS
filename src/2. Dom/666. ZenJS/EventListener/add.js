import ZenJS from "../../../shared/global/ZenJS/index";
import rtypenamespace from "../../../shared/const/rtypenamespace";
import { addEventListener } from "../../../shared/const/event";
import modifiers from "./modifiers";
import { GROUPS, MAINGROUPS } from "./util";


/**
 * 事件处理 => 绑定事件
 * @private
 * @param {EventTarget} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件回调
 * @param {Object} options 事件绑定参数
 * @param {String} mainGroup 事件分组参数 - 主分组, 移除主分组也会同时移除所有次分组
 * @param {String} group 事件分组参数 - 次分组
 * @param {Object} data 传递给事件的数据
 */
export default function add( elem, types, selector, listener, options, mainGroup, group, data ){

  /** 存放当前元素下的所有事件 */
  const events = elem.$data( 'events', {}, true );

  /** 事件 GUID */
  const guid = listener.guid || ( listener.guid = ZenJS.guid );

  /** 事件总数 */
  let length = types.length;

  let tmp,
      type,
      namespace,
      handleOptions;

  // 遍历绑定所有事件
  while( length-- ){

    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec( types[ length ] ) || [];

    /** 事件名称 */
    type = tmp[ 1 ];

    if( !type ) continue;

    /** 命名空间 */
    namespace = ( tmp[ 2 ] || '' ).split( '.' ).sort();

    // 处理功能性命名空间
    if( ZenJS.config.event.modifiers && modifiers( 'add', namespace, elem, type, events ) === false ){
      continue;
    }

    /** 该事件所有相关参数 */
    handleOptions = {
      elem, selector, type, namespace, listener, guid, options, mainGroup, group, data,
      namespaceStr: namespace.join('.'),
      handler(){
        return ZenJS.EventListener.dispatch( this, arguments, handleOptions );
      }
    };

    // 存储相关数据
    ( events[ type ] || ( events[ type ] = [] ) ).push( handleOptions );

    // 存储分组数据
    if( group ){
      const myGroup = GROUPS[ group ] || ( GROUPS[ group ] = [] );
            myGroup.push( handleOptions );

      if( mainGroup ){
        const myMainGroup = MAINGROUPS[ mainGroup ] || ( MAINGROUPS[ mainGroup ] = [] );
              myMainGroup.push( handleOptions );
      }
    }

    // 绑定事件
    if( options.passive ){
      elem[ addEventListener ]( type, handleOptions.handler, {
        passive: true,
        capture: options.capture || false
      });
    }else{
      elem[ addEventListener ]( type, handleOptions.handler, options.capture || false );
    }
  }
}