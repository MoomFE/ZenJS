import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import slice from "../../../shared/global/Array/prototype/slice";
import reHasUnicode from "../../../shared/const/reHasUnicode";
import reUnicode from "../../../shared/const/reunicode";
import { isBoolean, isString } from "../../../shared/const/type";
import $isArrayLike from "../$isArrayLike/index";
import isMap from "../../../shared/util/isMap";
import isSet from "../../../shared/util/isSet";
import mapSetToArray from "../../../shared/util/mapSetToArray";


export default function $toArray( value ){

  // 不可转为数组的, 直接返回空数组
  if( !value || value[ isBoolean ] ){
    return [];
  }

  // 是字符串类型
  if( value[ isString ] ){
    if( reHasUnicode.test( value ) ){
      return value.match( reUnicode ) || [];
    }else{
      return value.split('');
    }
  }

  // 是数组类型, 那就直接返回一个副本
  if( $isArrayLike( value ) ){
    return slice.call( value );
  }

  // 转换 Map, Set 类型
  if( isMap( value ) || isSet( value ) ){
    return mapSetToArray( value );
  }

  return [];
}

defineValue( Array, '$toArray', $toArray );

