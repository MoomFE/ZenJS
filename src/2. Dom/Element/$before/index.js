import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import inBrowser from "../../shared/const/inBrowser";


inBrowser && defineValue( ElementProto, {
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