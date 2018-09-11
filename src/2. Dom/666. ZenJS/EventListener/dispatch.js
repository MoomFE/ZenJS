import ZenJS from "../../../shared/global/ZenJS/index";
import slice from "../../../shared/global/Array/prototype/slice";
import modifiers from "./modifiers";


/**
 * 事件处理 => 触发事件
 * @param {DocumentEventMap} nativeEvent 当前触发的事件对象
 */
export default function dispatch( nativeEvent ){

  /** 重写的 event 事件对象 */
  const event = nativeEvent instanceof ZenJS.Event ? nativeEvent
                                                   : new ZenJS.Event( nativeEvent );

  /** 新 argument, 存放了新的 event 事件对象 */
  const args = slice.call( arguments ).$splice( 0, 1, event );

  /** 事件委托选择器 */
  const { selector } = this;

  let { elem } = this;
  let { target, type } = event;

  event.delegateTarget = elem;
  event.handleOptions = this;

  // 有事件委托
  if( selector && !( type === 'click' && event.button >= 1 ) ){
    // 从被点击的元素开始, 一层一层往上找
    for( ; target !== self; target = target.parentNode || elem ){
      // 是元素节点
      // 点击事件, 将不处理禁用的元素
      if( target.nodeType === 1 && cur.disabled === false && target.matches( selector ) ){
        elem = event.currentTarget = target;
        break;
      }
    }

    if( event.delegateTarget === elem ){
      return;
    }
  }else{
    if( !event.currentTarget ) event.currentTarget = elem;
    if( !target ) event.target = elem;
  }

  // 处理功能性命名空间
  if( ZenJS.config.event.modifiers && modifiers( 'dispatch', this.namespace, elem, type, event ) === false ){
    return;
  }

  const result = this.listener.apply( self, args );

  // 返回 false, 阻止浏览器默认事件和冒泡
  if( result === false && ZenJS.config.event.returnFalse ){
    event.preventDefault();
    event.stopPropagation();
  }

  return false;
}