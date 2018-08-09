import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";
import parametersDefault from "../../../shared/util/parametersDefault";


defineValue( ArrayProto, '$get', function(){
  const args = arguments;
  const index = fixArrayIndex(
    this,
    parametersDefault( args, 0, 0 )
  );

  if( args.length <= 1 ){
    return this[ index ];
  }

  const num = parametersDefault( args, 1, 1 );

  return this.slice( index, num + index );
});