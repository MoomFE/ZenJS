import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { Filter } from "../$first/util";


if( inBrowser ){

  defineValue( ElementProto, '$parent', function( filter ){
    return Filter( this.parentElement, filter, null, true );
  });

  defineValue( ElementProto, '$parents', function( filter, checkSelf ){
    return Filter( this, filter, 'parentElement', checkSelf );
  });

}