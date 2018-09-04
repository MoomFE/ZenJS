import { isFunction } from "../../../shared/const/type";

/**
 * 
 * @param {Element} node 当前 DOM 元素, 也可是 DOM 元素数组
 * @param {String} filter 过滤元素的 CSS 选择器和方法
 * @param {String} handler 获取下一个 DOM 元素的属性名
 * @param {Boolean} checkSelf 检测完当前 DOM 元素后再检测其他 DOM 元素
 */
export function Filter( node, filter, handler, checkSelf ){

  // 没有可过滤的元素
  if( node == null || node.length === 0 ) return node;

  // 没有过滤条件
  if( filter == null ){
    if( node.nodeType ){
      return checkSelf ? node
                       : node[ handler ];
    }
    return node;
  }

  // 传入的 filter 是否是方法
  // 传入了方法则使用传入的方法进行过滤
  // 否则使用 $is 来进行过滤
  const filterIsFunction = filter[ isFunction ];

  // Node
  if( node.nodeType ){

    // 首先检测当前 DOM 元素, 检测通过就直接返回
    if( checkSelf && ( filterIsFunction ? filter( node ) : node.$is( filter ) ) ){
      return node;
    }

    // 检测没通过就去获取下一个 DOM 元素再进行检测
    if( filterIsFunction ){
      while( ( node = node[ handler ] ) && !filter( node ) ){}
    }else{
      while( ( node = node[ handler ] ) && !node.$is( filter ) ){}
    }

    return node;
  }

  // Node Array
  return node.filter(
    filterIsFunction ? filter
                     : elem => elem.$is( filter )
  );
}

export function dir( elem, handler ){
  const matched = [];
  let index = 0;

  while( elem = elem[ handler ] ){
    matched[ index++ ] = elem;
  }

  return matched;
}