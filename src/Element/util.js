import isString from "../shared/util/isString";

/**
 * 
 * @param {Element} node 当前 DOM 元素, 也可是 DOM 元素数组
 * @param {String} filter 过滤元素的 CSS 选择器和方法
 * @param {String} handle 获取下一个 DOM 元素的属性名
 * @param {Boolean} checkSelf 只检测传入 DOM 元素
 */
export function Filter( node, filter, handle, checkSelf ){

  // 没有可过滤的元素
  if( node == null || node.length === 0 ) return;

  // 没有过滤条件
  if( filter == null ){
    return node.nodeType ? checkSelf
                            ? node
                            : node[ handle ]
                         // Node array
                         : node;
  }

  let filterIsString = isString( filter );

  // Node
  if( node.nodeType ){

    if( checkSelf && ( filterIsString ? node.$is( filter ) : filter( node ) ) ){
      return node;
    }

    if( filterIsString ){
      while( ( node = node[ handle ] ) && !node.$is( filter ) ){}
    }else{
      while( ( node = node[ handle ] ) && !filter( node ) ){}
    }

    return node;
  }

  // Node array
  return node.filter(
    filterIsString ? elem => elem.$is( filter )
                   : filter
  );
}

export function dir( elem, handle ){
  let matched = [];

  while( ( elem = elem[ handle ] ) ){
    matched.push( elem );
  }

  return matched;
}