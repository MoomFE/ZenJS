import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";


defineValue( ArrayProto, '$get', function(){
  const index = parametersDefault( arguments, 0, 0 );

  if( arguments.length <= 1 ){
    return this[ index ];
  }

  const num = arguments[ 1 ] || 1;

  return this.slice( index, num + index );
});