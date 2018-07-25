import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import slice from "../../../shared/global/Array/prototype/slice";
import reHasUnicode from "../../../shared/const/reHasUnicode";
import reUnicode from "../../../shared/const/reunicode";
import { isBoolean, isString, isArray } from "../../../shared/const/type";


export default function $toArray( value ){

  // 不可转为数组的, 直接返回空数组
  if( !value || value[ isBoolean ] ){
    return [];
  }

  // 是数组类型, 那就直接返回一个副本
  if( value[ isArray ] ){
    return slice.call( value );
  }

  // 是字符串类型
  if( value[ isString ] ){
    if( reHasUnicode.test( value ) ){
      return value.match( reUnicode ) || [];
    }else{
      return value.split('');
    }
  }

  // 其他类数组的类型, 比如 arguments, jQuery
  return slice.call( value );
}

defineValue( Array, '$toArray', $toArray );