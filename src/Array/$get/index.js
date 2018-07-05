import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";


defineValue( ArrayProto, '$get', function(){
  let index = parametersDefault( arguments, 0, 0 );

  if( index < 0 && ( index = this.length + index ) < 0 ){
    index = 0;
  }

  if( arguments.length <= 1 ){
    return this[ index ];
  }

  const num = parametersDefault( arguments, 1, 1 );

  return this.slice( index, num + index );
});