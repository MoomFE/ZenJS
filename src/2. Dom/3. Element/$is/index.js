import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import isString from "../../../shared/util/isString";
import matches from "../../../shared/global/DomElement/prototype/matches";


if( inBrowser ){

  defineValue( ElementProto, '$is', function( selector ){
    return selector.nodeType ? this === selector
                             : isString( selector ) ? matches.call( this, selector )
                                                    : false;
  });

  defineValue( ElementProto, '$not', function( selector ){
    return !this.$is( selector );
  });

}