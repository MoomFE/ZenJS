import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter } from "../util";


inBrowser && defineValue( ElementProto, '$child $children', function( filter ){
  return Filter( Array.from( this.children ), filter );
});