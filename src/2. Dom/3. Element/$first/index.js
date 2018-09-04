import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { Filter } from "./util";


if( inBrowser ){

  defineValue( ElementProto, '$first $firstChild', function( filter ){
    return Filter( this.firstElementChild, filter, 'nextElementSibling', true );
  });

  defineValue( ElementProto, '$last $lastChild', function( filter ){
    return Filter( this.lastElementChild, filter, 'previousElementSibling', true );
  });

}