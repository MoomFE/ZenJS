import { removeEventListener } from "../../../shared/const/event";
import { init, GROUPS, MAINGROUPS } from "./util";


/**
 * 事件处理 => 移除事件
 * @private
 * @param {EventTarget} elem 需要移除事件的独享
 * @param {Array} types 需要移除的事件集
 * @param {Function} listener 需要移除的事件回调
 * @param {String} selector 事件委托选择器
 */
export default function remove( elem, types, listener, selector ){
  init(
    elem, types,
    function( handleOptions, rNamespace, type, handlers, handlersLength ){
      // 检查注入到方法上的 guid 是否相同 ( 如果有 )
      if( !listener || listener.guid === handleOptions.guid ){
        // 检查命名空间是否相同 ( 如果有 )
        if( !rNamespace || rNamespace.test( handleOptions.namespaceStr ) ){
          // 检查事件委托
          if(
            selector
                // 允许所有绑定的事件通过, 不管有没有事件委托
              ? selector === '**' ||
                // 允许所有有事件委托的事件通过
                selector === '*' && handleOptions.selector ||
                // 事件委托必须相同才能通过
                selector === handleOptions.selector
              // 允许所有没事件委托的事件通过
              : !handleOptions.selector
          ){
            // 移除事件
            elem[ removeEventListener ]( type, handleOptions.handler );
            // 移除事件缓存
            handlers.splice( handlersLength, 1 );
            // 移除分组缓存
            let group = handleOptions.group;
            let mainGroup = handleOptions.mainGroup;

            // 移除副分组
            if( group && ( group = GROUPS[ group ] ) && !group.$deleteValue( handleOptions ).length ){
              delete GROUPS[ handleOptions.group ];
            }
            // 移除主分组
            if( mainGroup && ( mainGroup = MAINGROUPS[ mainGroup ] ) && !mainGroup.$deleteValue( handleOptions ).length ){
              delete MAINGROUPS[ handleOptions.mainGroup ];
            }

          }
        }
      }
    },
    function( handlers, events, type ){
      if( !handlers.length ){
        delete events[ type ];
      }
    }
  );
}