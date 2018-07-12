import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";


defineValue( ElementProto, '$replaceWith $replace', function( elem ){
  if( this.parentNode ){
    this.parentNode.replaceChild( elem, this );
  }
});