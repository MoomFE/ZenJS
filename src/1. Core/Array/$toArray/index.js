import defineValue from "../../shared/util/defineValue";
import Array from "../../shared/global/Array/index";
import slice from "../../shared/global/Array/prototype/slice";
import isString from "../../shared/util/isString";
import reHasUnicode from "../../shared/const/reHasUnicode";
import reUnicode from "../../shared/const/reunicode";


export default function $toArray( value ){
  if( !value ){
    return [];
  }
  if( isString( value ) ){
    if( reHasUnicode.test( value ) ){
      return value.match( reUnicode ) || [];
    }else{
      return value.split('');
    }
  }
  return slice.call( value );
}

defineValue( Array, '$toArray', $toArray );