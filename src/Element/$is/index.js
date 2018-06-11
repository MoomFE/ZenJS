import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import isString from "../../shared/util/isString";
import inBrowser from "../../shared/const/inBrowser";

inBrowser && defineValue( ElementProto, '$is', function( selector ){
  return selector.nodeType ? this === selector
                           : isString( selector ) ? this.matches( selector )
                                                  : false;
});