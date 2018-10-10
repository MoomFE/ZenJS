import "../../../shared/global/DomElement/prototype/matches";
import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import isString from "../../../shared/util/isString";
import isFunction from "../../../shared/util/isFunction";


if( inBrowser ){

  defineValue( ElementProto, '$is', function( selector ){
    if( selector.nodeType ) return this === selector;
    else if( isString( selector ) ) return this.matches( selector )
    else if( isFunction( selector ) ) return !!selector( this );
    return false;
  });

  defineValue( ElementProto, '$not', function( selector ){
    return !this.$is( selector );
  });

}