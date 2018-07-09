import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";
import fixArrayIndex from "../../shared/util/fixArrayIndex";


defineValue( ArrayProto, '$get', function(){
  let index = fixArrayIndex(
    this,
    parametersDefault( arguments, 0, 0 )
  );

  if( arguments.length <= 1 ){
    return this[ index ];
  }

  const num = parametersDefault( arguments, 1, 1 );

  return this.slice( index, num + index );
});