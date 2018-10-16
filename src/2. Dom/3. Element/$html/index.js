import inBrowser from "../../../shared/const/inBrowser";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import defineValue from "../../../shared/util/defineValue";


if( inBrowser ){

  defineValue( ElementProto, '$html', function( value ){
    if( arguments.length ){
      this.innerHTML = value;
      return this;
    }
    return this.innerHTML;
  });

}