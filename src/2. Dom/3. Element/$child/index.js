import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { Filter } from "../$first/util";
import slice from "../../../shared/global/Array/prototype/slice";


if( inBrowser ){
  defineValue( ElementProto, '$child $children', function( filter ){
    return Filter(
      slice.call( this.children ),
      filter
    );
  });
}