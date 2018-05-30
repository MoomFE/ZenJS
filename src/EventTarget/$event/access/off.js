import isObject from "../../../shared/util/isObject";
import isBoolean from "../../../shared/util/isBoolean";
import returnTrue from "../../../shared/util/returnTrue";
import returnFalse from "../../../shared/util/returnFalse";
import ZenJS from "../../../shared/global/ZenJS/index";


/**
 * 事件处理 => 移除事件1: 获取并处理参数
 * @param {String} types 需要解绑的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 解绑的事件
 */
export default function off( types, selector, listener ){

  let handleOptions,
      type;

  // $off( ZenJS.Event )
  if( types && types.preventDefault && ( handleOptions = types.handleOptions ) ){

    off.call(
      types.delegateTarget,
      handleOptions.namespace
        ? `${ handleOptions.type }.${ handleOptions.namespace.join('.') }`
        : handleOptions.type,
      handleOptions.selector,
      handleOptions.listener
    );

    return this;
  }

  // $off( object, select )
  if( isObject( types ) ){
    for( type in types ){
      off.call( this, type, selector, types[ type ] );
    }
    return this;
  }

  if( isBoolean( listener ) ){
    listener = listener ? returnTrue : returnFalse;
  }

  ZenJS.EventListener.remove( this, types, listener, selector );

  return this;
}