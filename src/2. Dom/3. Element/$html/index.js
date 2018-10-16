import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";


if( inBrowser ){

  defineValue( ElementProto, '$html', function( value ){
    if( arguments.length ){
      this.innerHTML = value;
      return this;
    }
    return this.innerHTML;
  });

}