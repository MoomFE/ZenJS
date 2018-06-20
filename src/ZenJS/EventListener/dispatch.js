import "../../Object/$set/index";
import Event from "../Event/index";
import ZenJS from "../../shared/global/ZenJS/index";
import namespaceHandler from "./namespace";


/**
 * 事件处理 => 触发事件
 * @param {DocumentEventMap} nativeEvent 当前触发的事件对象
 */
export default function dispatch( nativeEvent ){

  let self = this.elem;

  // 重写 event 对象
  const event = nativeEvent instanceof Event ? nativeEvent
                                             : new Event( nativeEvent );

  // 创建新的 argument
  const args = Array.from( arguments ).$set( 0, event );

  event.delegateTarget = self;
  event.handleOptions = this;
  event.data = this.data;

  const type = event.type;
  const { selector/*, needsContext */ } = this;

  // 如果有事件委托
  if( selector && !( type === 'click' && event.button >= 1 ) ){
    let cur = event.target;

    // 从被点击的元素开始, 一层一层往上找
    for( ; cur !== self; cur = cur.parentNode || self ){
      // 是元素节点
      // 如果当前是点击事件, 将不处理禁用的元素
      if( cur.nodeType === 1 && !( type === 'click' && cur.disabled === true ) ){
        if( cur.matches( selector ) ){
          self = event.currentTarget = cur;
          break;
        }
      }
    }

    if( event.delegateTarget === self ){
      return;
    }
  }else{
    if( !event.currentTarget ){
      event.currentTarget = self;
    }
    if( !event.target ){
      event.target = self;
    }
  }

  if( namespaceHandler( 'dispatch', this.namespace, self, type, event ) === false ){
    return;
  }

  const result = this.listener.apply( self, args );

  if( result === false && ZenJS.config.event.returnFalse ){
    event.preventDefault();
    event.stopPropagation();
  }

  return result;
}