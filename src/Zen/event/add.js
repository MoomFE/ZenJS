import { rtypenamespace } from "../../shared";
import isEmptyObject from '../../shared/util/isEmptyObject';

/**
 * 事件处理 => 添加事件3: 绑定事件
 * @param {Element} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} handler 绑定的事件
 * @param {Object} options 事件绑定参数
 */
export default function( elem, types, selector, handler, options ){

  let
    /** 存放当前元素下的所有事件 */
    events = elem.$data( 'events', {}, true ),
    /** 事件列表下的命名空间 */
    eventsNamespace = isEmptyObject( options ) ? '' : Object.keys( options ).sort().join(','),
    /** 事件总数 */
    length = types.length;


  console.log( eventsNamespace );

  

/*
  events: {
    click: {
      default: [
        // no options
      ],
      capture: [],
      passive: [],
      'capture passive': []
    },
    focus: ...
  }
*/

  // while( typeLength-- ){
  // }

}