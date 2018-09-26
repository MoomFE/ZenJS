import defineValue from "../../../shared/util/defineValue";
import FunctionProto from "../../../shared/global/Function/prototype/index";
import parametersDefault from "../../../shared/util/parametersDefault";


defineValue( FunctionProto, '$after', function(){
  const func = this;
  let num = parametersDefault( arguments, 0, 1 );

  return function(){
    num-- < 1 && func.apply( this, arguments );
  }
});