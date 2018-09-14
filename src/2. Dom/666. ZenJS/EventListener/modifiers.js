import equals from "../../../1. Core/1. Array/$equals/index";

/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */
export default function modifiers( name, namespace, elem, type, options ){

  // 没有命名空间
  if( namespace.length === 0 ){
    return;
  }

  /** 当前功能的修饰符列表 */
  const handlers = ModifiersList[ name ];

  let result;

  namespace
    .filter( name => name in handlers )
    .$each( handler => {
      return result = handlers[ handler ]( elem, type, options, namespace );
    });
  
  return result;
}


const ModifiersList = {
  /**
   * 添加事件时
   */
  add: {},
  /**
   * 触发事件时
   */
  dispatch: {

    /**
     * 当事件是从绑定的元素本身触发时才触发回调
     */
    self( elem, type, event ){
      return event.target === event.currentTarget;
    }

  }
};


const add = ModifiersList.add;
const dispatch = ModifiersList.dispatch;


/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */
add.once = add.one = function( elem, type, events, namespace ){
  events = events[ type ] || [];
  return events.$findIndex( { namespace }, equals ) === -1;
};

/**
 * .ctrl || .shift || .alt || .meta
 * 当按下了对应键盘按键时才触发回调
 */
[ 'ctrl', 'shift', 'alt', 'meta' ].forEach( key => {
  dispatch[ key ] = function( elem, type, event ){
    return !!event[ key + 'Key' ];
  }
});

/**
 * .left || .middle || .right
 * 当按下了对应鼠标按键时才触发回调
 */
[ 'left', 'middle', 'right' ].forEach(( button, index ) => {
  dispatch[ button] = function( elem, type, event ){
    return !( 'button' in event && event.button !== index );
  }
});