import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter } from "../util";
import $toArray from "../../Array/$toArray/index";


inBrowser && defineValue( ElementProto, '$child $children', function( filter ){
  return Filter( $toArray( this.children ), filter );
});