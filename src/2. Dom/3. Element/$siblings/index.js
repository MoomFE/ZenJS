import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { Filter } from "../$first/util";
import slice from "../../../shared/global/Array/prototype/slice";


if( inBrowser ){
  defineValue( ElementProto, '$siblings', function( filter ){
    const parent = this.parentElement;

    if( parent ){
      const children = slice.call( parent.children );

      return Filter(
        children.$splice( children.indexOf( this ), 1 ),
        filter
      );
    }
    return [];
  });
}