import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";

if( inBrowser ){

  defineValue( ElementProto, '$appendTo', function( elem ){
    return elem.appendChild( this ), this;
  });

  defineValue( ElementProto, '$prependTo', function( elem ){
    return elem.insertBefore( this, elem.firstElementChild ), this;
  });

}