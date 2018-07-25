import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import isString from "../../shared/util/isString";
import inBrowser from "../../shared/const/inBrowser";
import '../../shared/polyfill/matches';


inBrowser && defineValue( ElementProto, {
  $is( selector ){
    return selector.nodeType ? this === selector
                             : isString( selector ) ? this.matches( selector )
                                                    : false;
  },
  $not( selector ){
    return !this.$is( selector );
  }
});