import isRegExp from "../../shared/util/isRegexp";
import rkeyword from "../../shared/const/rkeyword";
import RegExp from "../../shared/global/RegExp/index";
import defineValue from "../../shared/util/defineValue";
import StringProto from "../../shared/global/String/prototype/index";


export default function $replaceAll( searchValue, replaceValue ){
  let flags = 'g';

  if( isRegExp( searchValue ) ){
    if( searchValue.global ){
      return this.replace( searchValue, replaceValue )
    }else{
      flags += searchValue.flags || '';
      searchValue = searchValue.source;
    }
  }else{
    searchValue = searchValue.replace( rkeyword, '\\$1' );
  }

  return this.replace(
    new RegExp( searchValue, flags ),
    replaceValue
  );
}

defineValue( StringProto, '$replaceAll', $replaceAll );