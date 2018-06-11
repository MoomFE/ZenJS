/**
 * @param {String}   filter    [ 过滤元素的css选择器或方法 ]
 * @param {Element}  node      [ 需要判断的元素或元素数组 ]
 * @param {Boolean}  checkSelf [ 只检测自身 ]
 * @param {Function} handle    [ 不检测自身的情况下, 获取下一个元素的方法 ]
 */
export function Filter( filter, node, handle, checkSelf ){
  if( filter == null ){
      return node.nodeType ? checkSelf ? node : node[ handle ]
                            : node;
  }

  let filterIsString = typeof filter == 'string';

  if( node.nodeType ){
      if( checkSelf ){// 直接传入唯一对象
          if( handle ){
              if( filterIsString ){
                  if( node.$is( filter ) ) return node;
              }else if( filter( node ) ){
                  return node;
              }
          }else{
              return filterIsString
                      ? node.$is( filter ) ? node : null
                      : filter( node ) ? node : null;
          }
      }
      if( filterIsString ){
          while( ( node = node[ handle ] ) && !node.$is( filter ) ){}
      }else{
          while( ( node = node[ handle ] ) && !filter( node ) ){}
      }
      return node;
  }

  return node.filter(
      filterIsString ? elem => elem.$is( filter )
                      : filter// Function
  );
}

export function dir( elem, handle ){
  let matched = [];

  while( ( elem = elem[ handle ] ) ){
    matched.push( elem );
  }

  return matched;
}