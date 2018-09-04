import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";


if( inBrowser ){

  defineValue( ElementProto, '$before', function( elem, parent ){
    if( parent = this.parentNode ){
      parent.insertBefore( elem, this );
    }
    return this;
  });

  defineValue( ElementProto, '$after', function( elem, parent ){
    if( parent = this.parentNode ){
      parent.insertBefore( elem, this.nextElementSibling );
    }
    return this;
  });

}