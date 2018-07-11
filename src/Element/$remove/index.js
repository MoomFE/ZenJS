import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";


defineValue( ElementProto, '$delete $remove', function(){
  if( this.parentNode ){
    this.parentNode.removeChild( this );
  }
});