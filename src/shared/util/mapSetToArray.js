/**
 * 将 Map 或 Set 类型转换为数组类型,
 * 执行到这之前必须确定传进来的是 Map 或 Set 类型
 * @param { Map | Set } map 
 */
export default function mapSetToArray( map ){
  const result = [];

  if( map instanceof Map ){
    map.forEach( ( key, value ) => result.push([ value, key ]) );
  }else{
    map.forEach( value => result.push( value ) );
  }

  return result;
}