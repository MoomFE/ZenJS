import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import inBrowser from "../../shared/const/inBrowser";


inBrowser && defineValue( ElementProto, '$delete $remove', function(){
  if( this.parentNode ){
    this.parentNode.removeChild( this );
  }
});