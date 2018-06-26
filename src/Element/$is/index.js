import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import isString from "../../shared/util/isString";
import inBrowser from "../../shared/const/inBrowser";


if( inBrowser ){

  ElementProto.matches || [ 'webkit', 'o', 'ms', 'moz' ].$each( core => {
    const matches = core + 'MatchesSelector';
    if( ElementProto[ matches ] ){
      return !( ElementProto.matches = ElementProto[ matches ] );
    }
  });

  defineValue( ElementProto, {
    $is( selector ){
      return selector.nodeType ? this === selector
                               : isString( selector ) ? this.matches( selector )
                                                      : false;
    },
    $not( selector ){
      return !this.$is( selector );
    }
  });

}