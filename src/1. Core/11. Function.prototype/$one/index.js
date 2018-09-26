import defineValue from "../../../shared/util/defineValue";
import FunctionProto from "../../../shared/global/Function/prototype/index";
import parametersDefault from "../../../shared/util/parametersDefault";


defineValue( FunctionProto, '$one $once', function(){
  const func = this;
  let num = parametersDefault( arguments, 0, 1 );
  let index = 1;

  return function(){
    index++ === num && func.apply( this, arguments );
  }
});