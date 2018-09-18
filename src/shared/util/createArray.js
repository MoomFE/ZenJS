import { isNumber } from "./isNumber";
import isFunction from "./isFunction";


/**
 * 快捷创建数组
 * @param length 需要创建的数组的长度
 * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index, 然后将方法的返回值填充到数组中
 * @param isInsert 若值为真, 即使二个参数 insert 是方法, 都会直接进行插入
 */
export default function create( length, insert, isInsert ){

  if( !isNumber( length ) || length < 1 ){
    return [];
  }

  let i = 0;
  const result = Array( length );

  if( !isInsert && isFunction( insert ) ){
    for( ; i < length; i++ )
      result[ i ] = insert( i );
  }else{
    for( ; i < length; i++ )
      result[ i ] = insert;
  }

  return result;
}