import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";

if( inBrowser ){

  defineValue( ElementProto, '$append', function( elem ){
    return this.appendChild( elem ), this;
  });

  defineValue( ElementProto, '$prepend', function( elem ){
    return this.insertBefore( elem, this.firstElementChild ), this;
  });

  defineValue( ElementProto, '$appendTo', function( elem ){
    return elem.appendChild( this ), this;
  });

  defineValue( ElementProto, '$prependTo', function( elem ){
    return elem.insertBefore( this, elem.firstElementChild ), this;
  });

}