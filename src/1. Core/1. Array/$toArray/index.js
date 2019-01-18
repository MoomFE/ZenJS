import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import slice from "../../../shared/global/Array/prototype/slice";
import reHasUnicode from "../../../shared/const/reHasUnicode";
import reUnicode from "../../../shared/const/reunicode";
import isArrayLike from "../../../shared/util/isArrayLike";
import isMap from "../../../shared/util/isMap";
import isSet from "../../../shared/util/isSet";
import mapSetToArray from "../../../shared/util/mapSetToArray";
import isPlainObject from "../../../shared/util/isPlainObject";
import keys from "../../../shared/global/Object/keys";
import values from "../../../shared/global/Object/values";
import isString from "../../../shared/util/isString";
import isBoolean from "../../../shared/util/isBoolean";


export default function $toArray( value, transKey ){

  // 不可转为数组的, 直接返回空数组
  if( !value || isBoolean( value ) ){
    return [];
  }

  // 是字符串类型
  if( isString( value ) ){
    if( reHasUnicode.test( value ) ){
      return value.match( reUnicode ) || [];
    }else{
      return value.split('');
    }
  }

  // 是数组类型, 那就直接返回一个副本
  if( isArrayLike( value ) ){
    return slice.call( value );
  }

  // 转换 Map, Set 类型
  if( isMap( value ) || isSet( value ) ){
    return mapSetToArray( value );
  }

  // 转换 JSON
  if( isPlainObject( value ) ){
    return transKey ? keys( value )
                    : values( value );
  }

  return [];
}

defineValue( Array, '$toArray', $toArray );