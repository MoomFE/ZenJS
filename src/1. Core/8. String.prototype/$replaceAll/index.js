import defineValue from "../../../shared/util/defineValue";
import StringProto from "../../../shared/global/String/prototype/index";
import { isString } from "../../../shared/const/type";
import rkeyword from "../../../shared/const/rkeyword";
import isRegExp from "../../../shared/util/isRegExp";
import RegExp from "../../../shared/global/RegExp/index";
import "../../../shared/polyfill/RegExp.prototype.flags";


defineValue( StringProto, '$replaceAll', function( searchValue, replaceValue ){
  let flags = 'g';

  if( searchValue == null ){
    return this;
  }

  if( searchValue[ isString ] ){
    searchValue = searchValue.replace( rkeyword, '\\$1' );
  }
  else if( isRegExp( searchValue ) ){
    if( searchValue.global ){ flags = searchValue.flags }
    else{ flags += searchValue.flags };

    searchValue = searchValue.source;
  }

  return this.replace(
    new RegExp( searchValue, flags ),
    replaceValue || ''
  );
});