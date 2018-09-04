import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";


if( inBrowser ){
  defineValue( ElementProto, '$delete $remove', function( parent ){
    if( parent = this.parentNode ){
      parent.removeChild( this );
    }
  });
}