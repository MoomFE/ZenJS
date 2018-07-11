import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";


defineValue( ElementProto, {
  $before: function( elem ){
    if( this.parentNode ){
      this.parentNode.insertBefore( elem, this );
    }
    return this;
  },
  $after: function( elem ){
    if( this.parentNode ){
      this.parentNode.insertBefore( elem, this.nextElementSibling );
    }
    return this;
  }
});